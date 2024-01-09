import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalAjout.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";


function CustomModalAjout(props) {
    const { modalOpenAjout, setModalOpenAjout } = props;
    const dropin = {
      hidden: {
        opacity: 0,
        transform: "scale(0.9)",
      },
      visible: {
        transform: "scale(1)",
        opacity: 1,
        transition: {
          duration: 0.1,
          type: "spring",
          damping: 25,
          stiffness: 500,
        },
      },
      exit: {
        transform: "scale(0.9)",
        opacity: 0,
      },
    };
  
    const [client, setClient] = useState({
      nameclient: "",
      lastnameclient: "",
      sexeclient: "",
      birthclient: "",
      adressclient: "",
      phoneclient: "",
      emailclient: "",
     
    });
    const { nameclient, lastnameclient, birthclient, sexeclient, adressclient, phoneclient, emailclient } = client;
  
    const validationSchema = Yup.object().shape({
        nameclient: Yup.string()
        .required("Nom est vide")
        .matches(/^[a-zA-Z ]+$/, "Le nom ne doit contenir que des lettres"),
        lastnameclient: Yup.string()
        .required("Prenom est vide")
        .matches(/^[a-zA-Z ]+$/, "Le prenom ne doit contenir que des lettres"),
      sexeclient: Yup.string().oneOf(["Masculin", "Feminin"], "Votre sexe"),
      birthclient: Yup.date()
      .required("Date de naissance est obligatoire")
      .max(
        new Date(),
        "Date de naissance ne peut pas être postérieure à aujourd'hui"
      ),
      adressclient: Yup.string()
        .required("Adresse est vide")
        .min(4, "Adresse doit plus de 3 caracteres")
        .max(40, "Adresse doit entre 40 mot"),
      phoneclient: Yup.string()
        .matches(
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,4}[-\s.]?[0-9]{2,4}$/,
          "Veuillez saisir un numéro de téléphone valide"
        )
        .required("Veuillez saisir un numéro de téléphone"),
  
      emailclient: Yup.string()
        .required("Email est vide")
        .email("Email ")
        .matches(/@gmail\.com$/, 'L\'email doit se terminer par "@gmail.com"'),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema),
    });
  
    const onInputChange = (e) => {
      setClient({ ...client, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
      await axios
        .post(`http://localhost:8000/api/addclient`, client)
        .then((response) => {
          alert("Client bien enregistré");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };
   
    return (
      <div>
        <AnimatePresence>
          {modalOpenAjout && (
            <motion.div
              className="wrapperm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="containerModal"
                variants={dropin}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="closeButton"
                  onClick={() => {
                    setModalOpenAjout(false);
                  }}
                  onKeyDown={() => setModalOpenAjout(false)}
                  tabIndex={0}
                  role="button"
                  initial={{ top: 40, opacity: 0 }}
                  animate={{ top: -10, opacity: 1 }}
                  exit={{ top: 40, opacity: 0 }}
                >
                  x
                </motion.div>
                <br></br> <br></br>
                <Row className="aligh-items-center">
                  <TrackVisibility>
                    <form className="login" onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <h3>Formulaire d'ajout client</h3>
                        <Row>
                          <Col size={12} sm={6} className="px-3">
                            <input
                              placeholder="Nom"
                              name="nameclient"
                              type="text"
                              value={nameclient}
                              {...register("nameclient")}
                              className={` ${errors.nameclient ? "is-invalid" : ""}`}
                              onChange={(e) => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                              {errors.nameclient?.message}
                            </div>
                          </Col>
                          <Col size={12} sm={6} className="px-3">
                            <input
                              placeholder="Prenom"
                              name="lastnameclient"
                              type="text"
                              value={lastnameclient}
                              {...register("lastnameclient")}
                              className={` ${
                                errors.lastnameclient ? "is-invalid" : ""
                              }`}
                              onChange={(e) => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                              {errors.lastnameclient?.message}
                            </div>
                          </Col>
                        </Row>
  
                        <Row>
                          <Col size={12} sm={6} className="px-3">
                            <select
                              {...register("sexeclient")}
                              value={sexeclient}
                              onChange={(e) => onInputChange(e)}
                            >
                              <option>Sexe</option>
                              <option value="Masculin">Masculin</option>
                              <option value="Feminin">Feminin</option>
                            </select>
                          </Col>
                          <Col size={12} sm={6} className="px-3">
                            <input
                              type="date"
                              value={birthclient}
                              {...register("birthclient")}
                              className={` ${
                                errors.birthclient ? "is-invalid" : ""
                              }`}
                              onChange={(e) => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                              {errors.birthclient?.message}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col size={12} sm={6} className="px-3">
                            <input
                              placeholder="Adresse"
                              name="adressclient"
                              type="text"
                              value={adressclient}
                              {...register("adressclient")}
                              className={`${errors.adressclient ? "is-invalid" : ""}`}
                              onChange={(e) => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                              {errors.adressclient?.message}
                            </div>
                          </Col>
  
                          <Col size={12} sm={6} className="px-3">
                            <input
                              placeholder="Telephone"
                              name="phoneclient"
                              type="phone"
                              value={phoneclient}
                              {...register("phoneclient")}
                              className={`${errors.phoneclient ? "is-invalid" : ""}`}
                              onChange={(e) => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                              {errors.phoneclient?.message}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col size={12} sm={3} className="px-1"></Col>
                          <Col size={12} sm={6} className="px-1">
                            <input
                              placeholder="E-mail"
                              name="emailclient"
                              type="text"
                              value={emailclient}
                              {...register("emailclient")}
                              className={` ${errors.emailclient ? "is-invalid" : ""}`}
                              onChange={(e) => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                              {errors.emailclient?.message}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col size={12} sm={2}></Col>
                          <Col size={12} sm={8}>
                            <button
                              type="submit"
                              onClick={() => setModalOpenAjout(false)}
                            >
                              Enregistrer
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </form>
                  </TrackVisibility>
                </Row>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  export default CustomModalAjout;
  