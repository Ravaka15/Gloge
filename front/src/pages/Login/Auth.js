import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../assets/style/CustomModal.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


function CustomModalEdit(props) {
  const { modalOpenEdit, setModalOpenEdit } = props;
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

  // const {id}=useParams();
  
  const [user,setUser]=useState({
      name:"",
      username:"",
      datenaissance:"",
      sexe:"",
      adresse:"",
      tel:"",
      email:"",
      type:"",
      password:"",
  });
  
  const{name,username,datenaissance,sexe,adresse,tel,email}=user;

      
  const onInputChange=(e)=>{
          setUser({...user, [e.target.name]: e.target.value});
  }

  // useEffect(()=>{
  //     loadUser()
  // },[])

  const onSubmit= async (e)=>{
      e.preventDefault();
      // await axios.put(`http://localhost:8080/user/${id}`,user);
  }

      // const loadUser = async() =>{
      //     // const result=await axios.get(`http://localhost:8080/user/${id}`)
      //     // setUser(result.data)
          
      // }
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
  });
 
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <AnimatePresence>
        {modalOpenEdit && (
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
                onClick={() => setModalOpenEdit(false)}
                onKeyDown={() => setModalOpenEdit(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Row className="aligh-items-center">
                <br></br>
                <TrackVisibility>
                  <form className="login" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12 offset-md border rounded p-4 mt-1 shadow">
                      <h2>Formulaire d'ajout patient</h2>
                      <Row>
                        <Col size={12} sm={6} className="px-1">
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
                        <Col size={12} sm={6} className="px-1">
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
                        <Col size={12} sm={6} className="px-1">
                          <input
                            type="date"
                            {...register("datenaissance")}
                            value={datenaissance}
                            onChange={(e) => onInputChange(e)}
                          />
                          {errors.datenaissance && (
                            <span>{errors.datenaissance.message}</span>
                          )}
                        </Col>

                        <Col size={12} sm={6} className="px-1">
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
                        <Col size={12} sm={6} className="px-1">
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

                        <Col size={12} sm={6} className="px-1">
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
                      <Row></Row>
                      <div className="form-group">
                        <button type="submit">Modifier</button>
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

export default CustomModalEdit;
