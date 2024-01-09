import { useState, useEffect } from "react";
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
  const [cites, setCites] = useState([]);
  const [selectedCite, setSelectedCite] = useState("");
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

  const [produit, setProduit] = useState({
    label: "",
    type: "",
    details: "",
    prix: "",
    image: null,
    cite_id: "",
    disponible: "1",
  });
  const { label, type, details, prix, cite_id } = produit;

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Nom de produit est vide"),
    details: Yup.string().required("Detail est vide"),
    type: Yup.string().oneOf(["Logement", "Terrain"], "Nom cité"),
    cite_id: Yup.string()
      .required("Cité est vide")
      .max(40, "Cite doit entre 40 mot"),
    prix: Yup.string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,4}[-\s.]?[0-9]{2,4}$/,
        "Veuillez saisir un prix valide"
      )
      .required("Veuillez saisir le nombre pour le prix"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  
  const onInputChange = (e) => {
    setProduit({ ...produit, [e.target.name]: e.target.value });
  };
  const onInputImage = (e) => {
    setProduit({ ...produit, [e.target.name]: e.target.files[0] });
  }
  useEffect(() => {
    getCites();
  }, []);

  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append('label', produit.label);
    formData.append('type', produit.type);
    formData.append('details', produit.details);
    formData.append('prix', produit.prix);
    formData.append('image', produit.image);
    formData.append('cite_id', produit.cite_id);
    formData.append('disponible', produit.disponible);
    await axios
      .post(`http://localhost:8000/api/produit`, formData)
      .then((response) => {
        console.log(response);
        alert("Produit bien enregistré");
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

  const handleSelect = (e) => {
    setSelectedCite(e.target.value);
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
                      <h3>Ajouter nouveau produit</h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Label"
                            name="label"
                            type="text"
                            value={label}
                            {...register("label")}
                            className={` ${errors.label ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.label?.message}
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <select
                            {...register("type")}
                            value={type}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option>Sélectionnez une type</option>
                            <option value="Logement">Logement</option>
                            <option value="Terrain">Terrain</option>
                          </select>
                        </Col>
                      </Row>

                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Prix"
                            type="text"
                            value={prix}
                            {...register("prix")}
                            className={` ${errors.prix ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="invalid-feedback">
                            {errors.prix?.message}
                          </div>
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <select
                            id="select-cite"
                            value={cite_id}
                            {...register("cite_id")}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option value="">Sélectionnez une cité</option>
                            {cites.map((cite) => (
                              <option key={cite.id} value={cite.id}>
                                {cite.localisation}
                              </option>
                            ))}
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={12} className="px-3">
                          <textarea
                            placeholder="Detail"
                            name="details"
                            type="text"
                            value={details}
                            {...register("details")}
                            className={`${errors.details ? "is-invalid" : ""}`}
                            onChange={(e) => onInputChange(e)}
                            style={{ height: "80px" }}
                          />
                          <div className="invalid-feedback">
                            {errors.details?.message}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={12} className="px-3">
                          <input
                            name="image"
                            type="file"
                            class="form-control"
                            onChange={(e) => onInputImage(e)}
                            style={{ height: "39px" }}
                          />
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
