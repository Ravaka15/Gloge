import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const InvoiceTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text>Nom :{invoice.nameclient}</Text>
        <Text>Prenom :{invoice.lastnameclient}</Text>
        <Text>Adresse : {invoice.adressclient}</Text>
        <Text>Telephone : {invoice.phoneclient}</Text>
        <Text>Email : {invoice.emailclient}</Text>
    </View>
  );
  
  export default InvoiceTo