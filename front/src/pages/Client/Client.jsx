import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilEditAlt, UilTrashAlt, UilEye } from "@iconscout/react-unicons";
import { Col, Row } from "react-bootstrap";
import CustomModalAjout from "./CustomModalAjout";
import CustomModalEdit from "./CustomModalEdit";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [selectedClient,setSelectedClient]= useState("");
  const [recherche,setRecherche] = useState("");
  useEffect(() => {
    getClient();
  }, []);

  const [modalOpenAjout, setModalOpenAjout] = useState(false);
  const openModalAjout = () => {
    setModalOpenAjout(true);
  };

  const getClient = async () => {
    const result = await axios.get(`http://localhost:8000/api/clients`);
    setClients(result.data);
  };

  const deleteClient = async (idclient) => {
    await axios.delete(`http://localhost:8000/api/clients/${idclient}`);
    getClient();
  };

  const rechercherClient = async (valeur) => {
    setRecherche(valeur.target.value);

    await axios
      .get(`http://localhost:8000/api/clients/search?search=${valeur.target.value}`)
      .then((response) => {
        setClients(response.data);
      })
      .catch();
  };
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const openModalEdit = (client) => {
    setSelectedClient(client);
    setModalOpenEdit(true);
  };
  return (
    <div>
      <h2 className="Titreh2">Liste de client</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={6} className="px-1">
          <input
              placeholder="Recherche"
              className="Recherche"
              value={recherche}
              onChange={(valeur) => rechercherClient(valeur)}
            />
          {/* <input type="text" value={searchValue} onChange={handleSearch} placeholder="Recherche" className="Recherche" /> */}
          </Col>

          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout" onClick={openModalAjout}>
              Creer un nouveau client
            </button>
          </Col>
        </Row>
      </div>
      <br></br>
      <table className="table" id="tablePatient">
        <thead>
          <tr>
            <th>Num</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Sexe</th>
            <th>Adresse</th>
            <th>Telephone</th>
            <th>E-mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{client.nameclient}</td>
              <td>{client.lastnameclient}</td>
              <td>{client.sexeclient}</td>
              <td>{client.adressclient}</td>
              <td>{client.phoneclient}</td>
              <td>{client.emailclient}</td>
              <td>
                <UilEditAlt className="Edit"  onClick={() => openModalEdit(client)}/>
              </td>
              {/* <td>
                <UilEye className="Voir" />
              </td> */}
              <td>
                <UilTrashAlt className="Delete" onClick={() => deleteClient(client.idclient)}/>
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
        client={selectedClient}
        setModalOpenEdit={setModalOpenEdit}
    />

    </div>
  );
}
