import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/Patient.css";
import { Col, Row } from "react-bootstrap";
import { UilEditAlt, UilTrashAlt, UilEye } from "@iconscout/react-unicons";
import CustomModalAjoutUser from "./CustomModalAjoutUser";
import CustomModalEditUser from "./CustomModalEditUser";
import CustomModalViewUser from "./CustomModalViewUser";

export default function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8000/api/users`);
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    loadUsers();
  };
  const [modalOpenAjout, setModalOpenAjout] = useState(false);
  const openModalAjout = () => {
    setModalOpenAjout(true);
  };
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const openModalEdit = (user) => {
    setSelectedUser(user);
    setModalOpenEdit(true);
  };
  const [modalOpenView, setModalOpenView] = useState(false);
  const openModalView = (user) => {
    setSelectedUser(user);
    setModalOpenView(true);
  };
  return (
    <div className="container">
      <h2 className="Titreh2">Liste utilisateur</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={6} className="px-1">
            <input placeholder="Recherche" className="Recherche" />
          </Col>

          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout" onClick={openModalAjout}>
              Creer nouveau utilisateur
            </button>
          </Col>
        </Row>
      </div>
      <br></br>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Telephone</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {users.map((user, index) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <UilEye className="Voir" onClick={() => openModalView(user)} />
              </td>
              <td>
                <UilEditAlt
                  className="Edit"
                  onClick={() => openModalEdit(user)}
                />
              </td>
              <td></td>
              <td>
                <UilTrashAlt
                  className="Delete"
                  onClick={() => deleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModalAjoutUser
        modalOpenAjout={modalOpenAjout}
        setModalOpenAjout={setModalOpenAjout}
      />
      <CustomModalEditUser
        modalOpenEdit={modalOpenEdit}
        user={selectedUser}
        setModalOpenEdit={setModalOpenEdit}
      />
      <CustomModalViewUser
        modalOpenView={modalOpenView}
        user={selectedUser}
        setModalOpenView={setModalOpenView}
      />
    </div>
  );
}
