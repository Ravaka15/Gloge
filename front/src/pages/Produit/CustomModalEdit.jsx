import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalAjout.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

function CustomModalEdit(props) {
  const { modalOpenEdit, setModalOpenEdit, produit } = props;
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

  const [produits, setProduits] = useState([]);
  useEffect(() => {
    setProduits(produit);
  }, [produit, modalOpenEdit]);
  const {
    label,
    type,
    prix,
    details,
    image
  } = produits;

  const closeModalEdit = () => {
    setModalOpenEdit(false);
    setProduits(produit);
  };

  const onInputChange = (e) => {
    setProduits({ ...produits, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await axios
      .put(`http://localhost:8000/api/clients/${produit.id}`, produits)
      .then((response) => {
        alert("Le produit a été modifié avec succès");
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
                      <h3>Modification : {produit.label}</h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Label"
                            name="label"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={label}
                            defaultValue={label}
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <select
                            value={type}
                            defaultValue={type}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option>Type</option>
                            <option value="Logement">Logement</option>
                            <option value="Terrain">Terrain</option>
                          </select>
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
