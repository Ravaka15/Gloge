import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalAjout.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

function CustomModalAjoutUser(props) {
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

  const [user, setUser] = useState({
    name: "",
    username: "",
    datenaissance: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",
    type: "Docteur",
    password: "",
  });
  const { name, username, datenaissance, sexe, adresse, tel, email, password } =
    user;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Nom est vide")
      .matches(/^[a-zA-Z ]+$/, "Le nom ne doit contenir que des lettres"),
    username: Yup.string()
      .required("Prenom est vide")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters")
      .matches(/^[a-zA-Z ]+$/, "Le prenom ne doit contenir que des lettres"),
    datenaissance: Yup.date()
      .required("Date de naissance est obligatoire")
      .max(
        new Date(),
        "Date de naissance ne peut pas être postérieure à aujourd'hui"
      ),
    sexe: Yup.string().oneOf(["Masculin", "Feminin"], "Votre sexe"),
    adresse: Yup.string()
      .required("Adresse est vide")
      .min(3, "Adresse doit plus de 3 caracteres")
      .max(20, "Username must not exceed 20 characters"),
    tel: Yup.string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,4}[-\s.]?[0-9]{2,4}$/,
        "Veuillez saisir un numéro de téléphone valide"
      )
      .required("Veuillez saisir un numéro de téléphone"),

    email: Yup.string()
      .required("Email est vide")
      .email("Email ")
      .matches(/@gmail\.com$/, 'L\'email doit se terminer par "@gmail.com"'),
      
    password: Yup.string()
      .required("Password est vide")
      .min(6, "Password doit superieur 6 caracteres")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirmer votre mot de passe"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    await axios
      .post("http://localhost:8080/user", user)
      .then((response) => {
        alert("OK");
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
                onClick={() => setModalOpenAjout(false)}
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
                <br></br>
                <TrackVisibility>
                  <form className="login" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <h3>Formulaire d'ajout utilisateur</h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Nom"
                            name="name"
                            type="text"
                            value={name}
                            {...register("name")}
                            className={` ${errors.name ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.name?.message}
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Prenom"
                            name="username"
                            type="text"
                            value={username}
                            {...register("username")}
                            className={` ${
                              errors.username ? "is-invalid" : ""
                            }`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.username?.message}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            type="date"
                            value={datenaissance}
                            {...register("datenaissance")}
                            className={` ${
                              errors.datenaissance ? "is-invalid" : ""
                            }`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.datenaissance?.message}
                          </div>
                        </Col>

                        <Col size={12} sm={6} className="px-3">
                          <select
                            {...register("sexe")}
                            value={sexe}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option>Sexe</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Feminin">Feminin</option>
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Adresse"
                            name="adresse"
                            type="text"
                            value={adresse}
                            {...register("adresse")}
                            className={`${errors.adresse ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.adresse?.message}
                          </div>
                        </Col>

                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Telephone"
                            name="tel"
                            type="tel"
                            value={tel}
                            {...register("tel")}
                            className={`${errors.tel ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.tel?.message}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={3} className="px-1"></Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            placeholder="E-mail"
                            name="email"
                            type="text"
                            value={email}
                            {...register("email")}
                            className={` ${errors.email ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.email?.message}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            placeholder="Mot de passe"
                            name="password"
                            type="password"
                            value={password}
                            {...register("password")}
                            className={`${errors.password ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.password?.message}
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            placeholder="Confirmer mot de passe"
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            className={`${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                          </div>
                        </Col>
                      </Row>
                      <div className="form-group">
                        <button
                          type="submit"
                          onClick={() => setModalOpenAjout(false)}
                        >
                          Enregistrer
                        </button>
                      </div>
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

export default CustomModalAjoutUser;
