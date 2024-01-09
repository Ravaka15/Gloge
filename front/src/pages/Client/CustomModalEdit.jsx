import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalAjout.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

function CustomModalEdit(props) {
  const { modalOpenEdit, setModalOpenEdit, client } = props;
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

  const [clients, setClients] = useState([]);
  useEffect(() => {
    setClients(client);
  }, [client, modalOpenEdit]);
  const {
    nameclient,
    lastnameclient,
    birthclient,
    sexeclient,
    adressclient,
    phoneclient,
    emailclient,
  } = clients;

  const closeModalEdit = () => {
    setModalOpenEdit(false);
    setClients(client);
  };

  const onInputChange = (e) => {
    setClients({ ...clients, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await axios
      .put(`http://localhost:8000/api/clients/${client.idclient}`, clients)
      .then((response) => {
        alert("Le client a été modifié avec succès");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

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
                onClick={() => closeModalEdit(false)}
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
                  <form className="login" onSubmit={onSubmit}>
                    <div>
                      <br></br> <br></br>
                      <br></br>
                      <h3>Modification : {client.nameclient}</h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Nom"
                            name="nameclient"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={nameclient}
                            defaultValue={nameclient}
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Prenom"
                            name="lastnameclient"
                            type="text"
                            value={lastnameclient}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            type="date"
                            value={birthclient}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>

                        <Col size={12} sm={6} className="px-3">
                          <select
                            value={sexeclient}
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
                            name="adressclient"
                            type="text"
                            value={adressclient}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>

                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Telephone"
                            name="phoneclient"
                            type="tel"
                            value={phoneclient}
                            onChange={(e) => onInputChange(e)}
                          />
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
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Row>
                          <Col size={12} sm={2}></Col>
                          <Col size={12} sm={8}>
                            <button type="submit">Modifier</button>
                          </Col>
                        </Row>
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

export default CustomModalEdit;
