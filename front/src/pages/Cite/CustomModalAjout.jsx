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

  const [cite, setCite] = useState({
    localisation: "",
  });
  const { localisation} = cite;

  const validationSchema = Yup.object().shape({
    localisation: Yup.string().required("Nom de produit est vide"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onInputChange = (e) => {
    setCite({ ...cite, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await axios
      .post(`http://localhost:8000/api/addcite`, cite)
      .then((response) => {
        alert("Cité bien enregistré");
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
              className="containerModalProduit"
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
                initial={{ top: 20, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 20, opacity: 0 }}
              >
                x
              </motion.div>
              <br></br> <br></br>
              <Row className="aligh-items-center">
                <TrackVisibility>
                  <form className="login" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <h3>Ajouter nouveau cité</h3>
                      <Row>
                        <Col size={12} sm={1} ></Col>
                        <Col size={12} sm={10} className="px-3">
                          <input
                            placeholder="Localisation"
                            name="localisation"
                            type="text"
                            value={localisation}
                            {...register("localisation")}
                            className={` ${errors.localisation ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.localisation?.message}
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
