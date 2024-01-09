import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "animate.css";
import { Link } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import "../../assets/style/Registre.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function Registre() {
  const [user, setUser] = useState({
    libelagence: "",
    localisation: "",
    telephone: "",
    email: "",
    password: "",
  });
  const {
    libelagence,
    localisation,
    telephone,
    email,
    password,
  } = user;

  const validationSchema = Yup.object().shape({
    libelagence: Yup.string()
      .required("Nom est vide")
      .matches(/^[a-zA-Z ]+$/, "Le nom ne doit contenir que des lettres"),
    username: Yup.string()
      .required("Prenom est vide")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters")
      .matches(/^[a-zA-Z ]+$/, "Le prenom ne doit contenir que des lettres"),
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
    <div className="container">
      <Row className="aligh-items-center">
        <br></br>
        <Col size={12} md={6}>
          <TrackVisibility>
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12 offset-md-6 border rounded p-4 mt-2 shadow">
                <h1>
                  <span> Registre </span>
                </h1>
                
                  <Col size={12} sm={12} className="px-1">
                    <input
                      placeholder="Nom agence"
                      name="libelagence"
                      type="text"
                      value={libelagence}
                      {...register("libelagence")}
                      className={` ${errors.libelagence ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.libelagence?.message}
                    </div>
                  </Col>
                

                  <Col size={12} sm={12} className="px-1">
                    <input
                      placeholder="Localisation"
                      name="localisation"
                      type="text"
                      value={localisation}
                      {...register("localisation")}
                      className={`${errors.localisation ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.localisation?.message}
                    </div>
                  </Col>

                  <Col size={12} sm={12} className="px-1">
                    <input
                      placeholder="Telephone"
                      name="telephone"
                      type="telephone"
                      value={telephone}
                      {...register("telephone")}
                      className={`${errors.telephone ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.telephone?.message}
                    </div>
                  </Col>
               
                  <Col size={12} sm={12} className="px-1">
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
              
                  <Col size={12} sm={12} className="px-1">
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
                  <Col size={12} sm={12} className="px-1">
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
                
                <div className="form-group">
                  <button type="submit">Enregistrer</button>
                  <Link to="/" className="boutonretour">Retour</Link>
                </div>
              </div>
            </form>
          </TrackVisibility>
        </Col>
      </Row>
    </div>
  );
}
