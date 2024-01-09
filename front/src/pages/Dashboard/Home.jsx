import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/Home.css";
import { Col, Row } from "react-bootstrap";
import { UilUsersAlt, UilUserMd, UilBuilding} from "@iconscout/react-unicons";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const [nombreclient, setNombreclient] = useState(0);
  const [nombreuser, setNombreuser] = useState(0);
  const [nombreproduit, setNombreproduit] = useState(0);
  const [dateRdv, setDateRdv] = useState(new Date());

  const moment = require("moment");

  const formattedDate = moment(dateRdv).format("YYYY-MM-DD");

  const nombreclients = async () => {
    await axios
      .get(`http://localhost:8000/api/clients/count`)
      .then((response) => {
        console.log(response);
        setNombreclient(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };
const nombreproduits = async () => {
  await axios
      .get(`http://localhost:8000/api/produits/count`)
      .then((response) => {
        setNombreproduit(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
}
  const nombreusers = async () => {
    await axios
      .get(`http://localhost:8000/api/users/count`)
      .then((response) => {
        setNombreuser(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [produits, setProduits] = useState([]);
  const [filter, setFilter] = useState("");
  const getProduit = async () => {
    const result = await axios.get(`http://localhost:8000/api/produits`);
    setProduits(result.data);
  };
  const searchProduit = (e) => {
    setFilter(e.target.value);
  };
  let dataFilter = produits.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
  useEffect(() => {
    nombreclients();
    nombreusers();
    nombreproduits()
    getProduit();
  }, [formattedDate, nombreclient, nombreuser, nombreproduit]);

  return (
    <div className="container">
      <div className="Cardcontainer">
        <Row>
          <Col size={12} sm={8}>
            <Row>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={3} className="Cardcompte">
                <div className="Cardtext">
                  <span>Nombre de client </span>
                  <br></br>
                  <br></br>
                  <span className="nombre">{nombreclient}</span>
                  <br></br>
                  <UilUsersAlt className="iconCard" />
                </div>
              </Col>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={3} className="Cardcomptecentre">
                <div className="Cardtext">
                  <span>Nombre utilisateur</span>
                  <br></br>
                  <br></br>
                  <span className="nombre">{nombreuser}</span>
                  <br></br>
                  <UilUserMd className="iconCard" />
                </div>
              </Col>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={3} className="Cardcompte">
                <div className="Cardtext">
                  <span>Nombre de produit </span>
                  <br></br>
                  <br></br>
                  <span className="nombre">{nombreproduit}</span>
                  <br></br>
                  <UilBuilding className="iconCard" />
                </div>
              </Col>
              <Col size={12} sm={1}></Col>
            </Row>

            <Row>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={11}>
                <section className="py-4 container">
                  <div className="row justify-content-center" style={{height:"200px"}}>
                    <div className="col-12 md-5">
                      <div className="mb-3 col-4 mx-auto">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Recherche..."
                          value={filter}
                          onChange={searchProduit.bind(this)}
                        />
                      </div>
                    </div>
                    {dataFilter.length > 0 ? (
                      dataFilter.map((produit, index) => {
                        return (
                          <div className="col-8 col-lg-3 mx-0 mb-4" style={{height:"280px"}}>
                            <div className="card p-0 overflow-hidden h-100 shadow">
                              <img
                                src={
                                  "http://localhost:8000/images/" +
                                  produit.image
                                }
                                className="card-img-top"
                              />
                              <div className="card-body">
                                <h5>{produit.label}</h5>
                                <h6>{produit.prix}</h6>
                                <p>{produit.type}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="col-12 md-5">
                          <div className="mb-3 col-4 mx-auto">
                            <h3>Produit vide</h3>
                            <p>pas de resultat pour le mot "{filter}"</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </Col>
            </Row>
          </Col>
          <Col size={12} sm={1}></Col>
          <Col
            size={12}
            sm={3}
            style={{ backgroundColor: "white", borderRadius: "30px" }}
          >
            <Row>
              <Row>
                <Col
                  size={12}
                  sm={12}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "30px",
                    height: "350px",
                  }}
                >
                  <h4>Calendrier de rendez-vous</h4>
                  <Calendar onChange={setDateRdv} value={dateRdv} />
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
