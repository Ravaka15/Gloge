import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import headerImg from "../../assets/img/bienvenu.jpg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "../../assets/style/Login.css";
import { useNavigate } from "react-router-dom";
import authService from "../../Service/AuthService/AuthService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendLoginRequest = () => {
    authService
      .login(email, password)
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        
      });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email est vide")
      .email("Email ")
      .matches(/@gmail\.com$/, 'L\'email doit se terminer par "@gmail.com"'),
    password: Yup.string()
      .required("Password est vide")
      .min(6, "Password doit superieur 6 caracteres")
      .max(40, "Password must not exceed 40 characters"),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const openRegistre= () => {
    navigate("/registre")
  }

  const loginCheck = () =>{

  }

  return (
    <div className="containerLogin">
      <Row>
        <Col>
          <br></br>
            <form className="login" onSubmit={handleSubmit(sendLoginRequest)}>
              <div className="col-md-8 offset-md-3 mt-2">
                <h1>
                  <span> Bienvenu ! </span>
                </h1>
                <Col size={12} className="px-1">
                  <input
                    type="text"
                    placeholder="E-mail"
                    id="email"
                    value={email}
                    {...register("email")}
                    className={` ${errors.email ? "is-invalid" : ""}`}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                </Col>
                <br></br>
                <Col size={12} className="px-1">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    {...register("password")}
                    className={`${errors.password ? "is-invalid" : ""}`}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                </Col>
                <div className="loginbouton">
                <button
                  id="submit"
                  type="submit"
                  className="bouton"
                  onClick={sendLoginRequest}
                >
                  Se connecter
                  <ArrowRightCircle size={25} />
                </button>
                <button onClick={() => openRegistre()}
                className="bouton">
                  Creer compte
                </button>
                </div>
              </div>
            </form>
     
        </Col>

        <Col>
              <div
                className="imagelogin"
              >
                <img src={headerImg} alt="Header Img" className="Image" />
              </div>
       
        </Col>
      </Row>
    </div>
  );
}
