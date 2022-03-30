import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';

const axios = require('axios');


var blockTest:String;

const data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "hmyv2_getTransactionsHistory",
    "params": [{
        "address": "0xc6cc22EFDCcDd3f06ce9588798CA2f001EbdEe31",
        "pageIndex": 0,
        "pageSize": 1000,
        "fullTx": true,
        "txType": "ALL",
        "order": "DESC"
    }],
    "id": 1
});

var config = {
  method: 'post',
  url: 'https://api.harmony.one',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

function App() {

  interface Transaction {
    timestamp: number;
    blockHash: string;
    ethHash: string;
    input: any;
    gas: number;
  }
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // import transactions
  useEffect(() => {
    axios(config)
    .then(function (response:any) {
      console.log(response.data.result);
      setTransactions([...response.data.result.transactions])
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }, [])

  const listTransactions = transactions.map((tx) =>
   <TransactionEntry 
    tx_timestamp = {tx.timestamp}
    tx_ethHash = {tx.ethHash}
    tx_input = {tx.input}
    tx_gas = {tx.gas}
    key = {tx.ethHash}
   />
  );

  return (
    <div className="App">
      <main>
        <h1>Testing Harmony Blockchain API..</h1>
        <p>{blockTest}</p>
        <table>
          <thead>
            <td>Date:</td>
            <td>Transaction Hash:</td>
            <td>Method:</td>
            <td>Gas:</td>
          </thead>
          <tbody>
            {listTransactions}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
