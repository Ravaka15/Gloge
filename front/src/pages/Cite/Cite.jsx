import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilEditAlt, UilTrashAlt, UilEye } from "@iconscout/react-unicons";
import { Col, Row } from "react-bootstrap";
import CustomModalAjout from "./CustomModalAjout";
import CustomModalEdit from "./CustomModalEdit";
import "../../assets/style/Produit.css";

export default function Cite() {
  const [cites, setCites] = useState([]);
  const [selectedCite,setSelectedCite]= useState("");
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    getCite();
  }, []);

  const [modalOpenAjout, setModalOpenAjout] = useState(false);
  const openModalAjout = () => {
    setModalOpenAjout(true);
  };

  const getCite = async () => {
    const result = await axios.get(`http://localhost:8000/api/cites`);
    setCites(result.data);
  };

  const deleteCite = async (idcite) => {
    await axios.delete(`http://localhost:8000/api/cites/${idcite}`);
    getCite();
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    axios.get(`/clients/search?search=${e.target.value}`)
      .then(response => setCites(response.data))
      .catch(error => console.log(error));
  }

  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const openModalEdit = (cite) => {
    setSelectedCite(cite);
    setModalOpenEdit(true);
  };
  return (
    <div>
      <h2 className="Titreh2">Liste de cité</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={2} className="px-1"></Col>
          <Col size={12} sm={4} className="px-1">
          <input type="text" value={searchValue} onChange={handleSearch} placeholder="Recherche" className="Recherche" />
          </Col>
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout" onClick={openModalAjout}>
              Nouveau cité
            </button>
          </Col>
        </Row>
      </div>
      <br></br>
      <table className="table" id="tablePatient" style={{width:"790px",marginLeft:"16%"}}>
        <thead>
          <tr>
            <th>Num</th>
            <th>Libelle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cites.map((cite, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{cite.localisation}</td>
              <td>
                <UilEditAlt className="Edit"  onClick={() => openModalEdit(cite)}/>
              </td>
              {/* <td>
                <UilEye className="Voir" />
              </td> */}
              <td>
                <UilTrashAlt className="Delete" onClick={() => deleteCite(cite.idclient)}/>
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
        cite={selectedCite}
        setModalOpenEdit={setModalOpenEdit}
    />

    </div>
  );
}
