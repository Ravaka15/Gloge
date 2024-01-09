import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalAjout.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

function Achatclient(props) {
  const { modalOpenAchat, setModalOpenAchat, produit } = props;
  const [clients, setClients] = useState([]);
  const idproduit = produit.id;
  console.log(idproduit);
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

  const [achat, setAchat] = useState({
    client_id: "",
    produit_id: "",
    type: "",
  });

  const { client_id, produit_id, type } = achat;
  console.log(achat);
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("type de produit est vide"),
  });
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onInputChange = (e) => {
    setAchat({ ...achat, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await axios
      .post(`http://localhost:8000/api/achat`, achat)
      .then((response) => {
        console.log(response);
        alert("Votre bien enregistré");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  
  const getClient = async () => {
    const result = await axios.get(`http://localhost:8000/api/clients`);
    setClients(result.data);
  };


  useEffect(() => {
    getClient();
    setAchat({ ...achat, produit_id: idproduit });
  }, [achat]);

  return (
    <div>
      <AnimatePresence>
        {modalOpenAchat && (
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
                  setModalOpenAchat(false);
                }}
                onKeyDown={() => setModalOpenAchat(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Row className="aligh-items-center">
                <TrackVisibility>
                  <form className="login" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <h3>Faire un achat</h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Localisation"
                            name="localisation"
                            type="text"
                            value={produit.label}
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Localisation"
                            name="localisation"
                            type="text"
                            value={produit.prix}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            name="localisation"
                            type="text"
                            value={produit.localisation}
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <select
                            {...register("type")}
                            value={type}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option>Type d'achat</option>
                            <option value="A credit">A credit</option>
                            <option value="En montant">En montant</option>
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={10}>
                          <select
                            id="select-cite"
                            value={client_id}
                            {...register("client_id")}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option value="">Sélectionnez votre nom</option>
                            {clients.map((client) => (
                              <option
                                key={client.idclient}
                                value={client.idclient}
                              >
                                {client.nameclient}
                              </option>
                            ))}
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={2}></Col>
                        <Col size={12} sm={8}>
                          <button
                            type="submit"
                            onClick={() => setModalOpenAchat(false)}
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

export default Achatclient;
