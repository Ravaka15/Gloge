
import React, { useEffect, useState } from "react";
import "../../assets/style/Dossierpatient.css";
import { Col, Row } from "react-bootstrap";
import { UilEye } from "@iconscout/react-unicons";
import axios from "axios";
export default function Dossierpatient() {
  const [ordonnances, setOrdonnances] = useState([]);
  useEffect(() => {
    loadOrdonnances();
  }, []);
  
  const loadOrdonnances = async () => {
    const result = await axios.get(`http://localhost:8080/ordonnances`);
    setOrdonnances(result.data);
  };

  return (
    <div className="dossierpatient">
      <h2 className="Titreconsultation">Les patients et ses dossiers</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={6} className="px-1">
            <input placeholder="Recherche" className="Recherche" />
          </Col>

          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout">Imprimer tous les dossiers</button>
          </Col>
        </Row>
      </div>
      <br></br>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Sexe</th>
            <th scope="col">Maladie</th>
            <th scope="col">Observation</th>
            <th scope="col">Date consultation</th>
            <th scope="col">Voir</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {ordonnances.map((ordonnance, index) => (
            <tr>
              <td>{ordonnance.consultations[0].users[0].name}</td>
              <td>{ordonnance.consultations[0].users[0].username}</td>
              <td>{ordonnance.consultations[0].users[0].sexe}</td>
              <td>{ordonnance.consultations[0].maladie}</td>
              <td>{ordonnance.observation}</td>
              <td>{ordonnance.consultations[0].date_consultation}</td>

              <td>
                <UilEye className="Voir" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
