import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

export default function Achatfacture(props) {
    const { modalOpenFacturePdf, setModalOpenFacturePdf, achat } = props;
    const idfacture =  achat.idclient;
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
    }
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
              saldf{achat.idclient}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
