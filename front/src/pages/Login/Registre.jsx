import { useEffect, useState } from "react";
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
  const [cites, setCites] = useState([]);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cite_id: "",
  });

  const { name, phone, email, password, cite_id } = user;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Prenom est vide")
      .min(2, "Username must be at least 6 characters")
      .max(40, "Username must not exceed 20 characters")
      .matches(/^[a-zA-Z ]+$/, "Le prenom ne doit contenir que des lettres"),
    phone: Yup.string()
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
    acceptTerms: Yup.bool().oneOf([true], "Acceptation obligatoire"),
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
      .post(`http://localhost:8000/api/registre`, user)
      .then((response) => {
        alert("Agence bien enregistré");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const getCites = async (e) => {
    await axios
      .get(`http://localhost:8000/api/cites`)
      .then((response) => {
        setCites(response.data.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    getCites()
  })
  
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
                    name="name"
                    type="text"
                    value={name}
                    {...register("name")}
                    className={` ${errors.name ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Col>

                <Col size={12} sm={12} className="px-1">
                  <input
                    placeholder="Telephone"
                    name="phone"
                    type="text"
                    value={phone}
                    {...register("phone")}
                    className={`${errors.phone ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
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
                          <select id="select-cite" value={cite_id} {...register("cite_id")} onChange={(e) => onInputChange(e)}>
                            <option value="">
                              Sélectionnez une cité
                            </option>
                            {cites.map((cite) => (
                              <option key={cite.id} value={cite.id}>
                                {cite.localisation}
                              </option>
                            ))}
                          </select>
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
                    className={`${errors.confirmPassword ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </Col>

                <div className="form-group">
                  <button type="submit">Enregistrer</button>
                  <Link to="/" className="boutonretour">
                    Retour
                  </Link>
                </div>
              </div>
            </form>
          </TrackVisibility>
        </Col>
      </Row>
    </div>
  );
}
