import React from 'react';
import { Page, Document, Image, StyleSheet,Text,View} from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import InnvoiceTo from './InvoiceTo'
// import InvoiceNo from './InvoiceNo'
 import InvoiceItemsTable from './InvoiceItemsTable'
// import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from '../../src/assets/img/logo.jpg';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='Facture'/>
                <InnvoiceTo invoice={invoice}/>
                
                <InvoiceItemsTable invoice={invoice} /> 
                 
                    
                    {/* <InvoiceNo invoice={invoice}/>
                    
                    
                    <InvoiceThankYouMsg /> */}
                </Page>
            </Document>
        );
  
  export default Invoice
