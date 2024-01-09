import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilEditAlt, UilTrashAlt } from "@iconscout/react-unicons";
import { Col, Row } from "react-bootstrap";
import CustomModalAjout from "./CustomModalAjout";
import CustomModalEdit from "./CustomModalEdit";
import "../../assets/style/Produit.css";

export default function Client() {
  const [produits, setProduits] = useState([]);
  const [selectedProduits, setSelectedProduits] = useState("");

  useEffect(() => {
    getProduit();
  }, []);

  const [modalOpenAjout, setModalOpenAjout] = useState(false);
  const openModalAjout = () => {
    setModalOpenAjout(true);
  };

  const getProduit = async () => {
    const result = await axios.get(`http://localhost:8000/api/produits`);
    setProduits(result.data);
  };

  const deleteProduit = async (id) => {
    await axios.delete(`http://localhost:8000/api/produit/${id}`);
    getProduit();
  };

  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const openModalEdit = (produit) => {
    setSelectedProduits(produit);
    setModalOpenEdit(true);
  };
  return (
    <div>
      <h2 className="Titreh2">Liste de produit</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={4} className="px-1">
            <input placeholder="Recherche" className="Recherche" />
          </Col>
          <Col size={12} sm={3} className="px-1"></Col>
          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout" onClick={openModalAjout}>
              Nouveau produit
            </button>
          </Col>
        </Row>
      </div>
      <br></br>
      <table
        className="table"
        id="tablePatient"
        style={{ width: "1040px", marginLeft: "8%" }}
      >
        <thead>
          <tr>
            <th>Num</th>
            <th>Image</th>
            <th>Produit</th>
            <th>Prix</th>
            <th>Cité</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={"http://localhost:8000/images/" + produit.image}
                />
              </td>
              <td>{produit.label}</td>
              <td>{produit.prix}</td>
             
              <td>{produit.localisation}</td>
              <td>
                <UilEditAlt
                  className="Edit"
                  onClick={() => openModalEdit(produit)}
                />
              </td>
              {/* <td>
                <UilEye className="Voir" />
              </td> */}
              <td>
                <UilTrashAlt
                  className="Delete"
                  onClick={() => deleteProduit(produit.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModalAjout
        modalOpenAjout={modalOpenAjout}
        setModalOpenAjout={setModalOpenAjout}
      />

      <CustomModalEdit
        modalOpenEdit={modalOpenEdit}
        produit={selectedProduits}
        setModalOpenEdit={setModalOpenEdit}
      />
    </div>
  );
}
