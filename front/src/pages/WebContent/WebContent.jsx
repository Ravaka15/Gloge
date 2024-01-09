import React, { useState, useEffect } from "react";
import axios from "axios";
import Achatclient from "./Achatclient";
export default function WebContent() {
  const [produits, setProduits] = useState([]);
 
  const [filter, setFilter] = useState("");
  const [selectedProduit,setSelectedProduit] = useState([]);
  const [modalOpenAchat,setModalOpenAchat] = useState(false);
  const openModalAchat = (produit) => {
    setSelectedProduit(produit);
    setModalOpenAchat(true);
  };
  const getProduit = async () => {
    const result = await axios.get(`http://localhost:8000/api/produitsdispo`);
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
    getProduit();
   
  }, []);

  return (
    <div>
    <section className="py-4 container">
      <div className="row justify-content-center">
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
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img
                    src={"http://localhost:8000/images/" + produit.image}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5>{produit.label}</h5>
                    <h6>{produit.prix}</h6>
                    <p>{produit.type}</p>
                  </div>
                  <div className="card-footer">
                    <button onClick={() => openModalAchat(produit)}>Reserver</button>
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
    <Achatclient
    modalOpenAchat={modalOpenAchat}
    produit={selectedProduit}
    setModalOpenAchat={setModalOpenAchat}
/></div>
  );
}
