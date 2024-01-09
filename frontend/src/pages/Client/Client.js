import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Client() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    const result = await axios.get(`http://localhost:8080/client`);
    setClients(result.data);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Sexe</th>
            <th>Adresse</th>
            <th>Telephone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.sexe}</td>
              <td>{client.adress}</td>
              <td>
                <button className="button is-small is-info">Edit</button>
                <button className="button is-small is-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
