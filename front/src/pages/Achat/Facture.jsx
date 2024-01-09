import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../../component/Invoice";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

export default function Facture(props) {
  const { modalOpenFacturePdf, setModalOpenFacturePdf, achat } = props;
  const idfacture = achat.id ?? 19;
  console.log(idfacture)
//   const [data, setData] = useState({});
  useEffect(() => {
    loadDossiers();
  },[]);
  const loadDossiers = async () => {
    const result = await axios.get(
      `http://localhost:8000/api/achat/${idfacture}`
    );
  
    // const fetchdata = result.data;

    // const transformedData = {};

    // fetchdata.forEach((obj) => {
    //   if (!transformedData[obj.id]) {
     
    //     transformedData[obj.id] = {
    //       id: obj.id,
    //       name: obj.name,
    //       username: obj.username,
    //       datenaissance: obj.datenaissance,
    //       items: [],
    //       maladie: obj.maladie,
    //       resultat: obj.resultat,
    //       sexe: obj.sexe,
    //       adresse: obj.adresse,
    //       tel: obj.tel,
    //       email:obj.email,
    //       dateconsultation: obj.dateconsultation
    //     };
    //   }
    //   transformedData[obj.id].items.push({
    //     idconsultation: obj.idconsultation,
    //     maladie: obj.maladie,
    //     resultat: obj.resultat,
    //     idordonnance: obj.idordonnance,
    //     medicament: obj.medicament,
    //     nombremedicament: obj.nombremedicament,
    //     dureetraitement: obj.dureetraitement,
    //     modetraitement: obj.modetraitement,
    //     observation: obj.observation,
    //   });
    // });
    // const transformed = Object.values(transformedData)[0];
    // setData(transformed);
  };


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
  return (
    <div>
      <AnimatePresence>
        {modalOpenFacturePdf && (
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
                  setModalOpenFacturePdf(false);
                }}
                onKeyDown={() => setModalOpenFacturePdf(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Fragment>
                <PDFViewer width="520" height="500" className="app">
                  <Invoice invoice={achat} />
                </PDFViewer>
              </Fragment>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

