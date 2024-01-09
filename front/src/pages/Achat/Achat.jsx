import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilPrint, UilEye } from "@iconscout/react-unicons";
import { Col, Row } from "react-bootstrap";
import "../../assets/style/Achat.css";
import Facture from "./Facture";

export default function Achat() {
  const [achats, setAchats] = useState([]);
  const [selectedAchat, setSelectedAchat] = useState([]);
  const [modalOpenFacturePdf, setModalOpenFacturePdf] = useState(false);

  const openModalFacturePdf = (achat) => {
    setSelectedAchat(achat);
    setModalOpenFacturePdf(true);
  };

  const getAchats = async () => {
    const result = await axios.get(`http://localhost:8000/api/achat`);
    setAchats(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    getAchats();
  }, []);

  return (
    <div className="container">
      <h2 className="Titreh2">Liste d'achat</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={3}></Col>
          <Col size={12} sm={3} className="px-1">
            <input placeholder="Recherche" className="Rechercheachat" />
          </Col>
          
          <Col size={12} sm={3}>
            <span className="Buttonajout">
              Nombre d'achat : {achats.length}
            </span>
          </Col>
          <Col size={12} sm={3}></Col>
        </Row>
      </div>
      <br></br>
      <Row>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Telephone</th>
              <th scope="col">Email</th>
              <th scope="col">Produit</th>
              <th scope="col">Prix</th>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {achats.map((achat, index) => (
              <tr>
                <td>{achat.nameclient}</td>
                <td>{achat.lastnameclient}</td>
                <td>{achat.phoneclient}</td>
                <td>{achat.emailclient}</td>
                <td>{achat.label}</td>
                <td>{achat.prix}</td>
                <td>{achat.type}</td>
                <td>
                  <UilPrint
                    className="Voir"
                    onClick={() => openModalFacturePdf(achat)}
                  />
                </td>
                <td>
                  <UilEye
                    className="Edit"
                    // onClick={() => openModalEdit(produit)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
      <Row>
        <h4>Les produits vendu</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Telephone</th>
              <th scope="col">Email</th>
              <th scope="col">Produit</th>
              <th scope="col">Prix</th>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {achats.map((achat, index) => (
              <tr>
                <td>{achat.nameclient}</td>
                <td>{achat.lastnameclient}</td>
                <td>{achat.phoneclient}</td>
                <td>{achat.emailclient}</td>
                <td>{achat.label}</td>
                <td>{achat.prix}</td>
                <td>{achat.type}</td>
                <td>
                  <UilPrint
                    className="Voir"
                    onClick={() => openModalFacturePdf(achat)}
                  />
                </td>
                <td>
                  <UilEye
                    className="Edit"
                    // onClick={() => openModalEdit(produit)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
      <Facture
        modalOpenFacturePdf={modalOpenFacturePdf}
        achat={selectedAchat}
        setModalOpenFacturePdf={setModalOpenFacturePdf}
      />
    </div>
  );
}
