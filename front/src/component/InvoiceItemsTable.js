import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './contentTable/InvoiceTableHeader'
import InvoiceTableRow from './contentTable/InvoiceTableRow'
import InvoiceTableBlankSpace from './contentTable/InvoiceTableBlankSpace'

const tableRowsCount = 19;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice} />
    </View>
  );
  
  export default InvoiceItemsTable