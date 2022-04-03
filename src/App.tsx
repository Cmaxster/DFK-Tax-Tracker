import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';

import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const axios = require('axios');

function App() {

  interface Transaction {
    timestamp: number;
    blockHash: string;
    ethHash: string;
    input: any;
    gas: number;
    gasPrice: number; 
  }
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("0xc6cc22EFDCcDd3f06ce9588798CA2f001EbdEe31"); //default value

  const onWalletTextFieldChange = (e: any) => setWalletAddress(e.target.value);

  const submitWalletAddress = () => pullTransactionData()

  // API Call to pull transactions..
  const pullTransactionData = () => {
    console.log('>> [App] Attempting Transaction Pull')
    axios({url:'http://localhost:3001/transactions/'+walletAddress})
        .then(function (response:any) {
            console.log('>> [App] Transaction pull = SUCCESS.. Data received: ',response);
            setTransactionData(response.data.transactions)
        }).catch(function (error:any) {
            console.log('>> [App] Something went wrong with transaction pull: ',error);
            return 'not available'
        });
  }

  useEffect(() => { // might use this at some point.. placeholder..
    console.log('>> [app] UseEffect > ')
  },[])

  const listTransactions = transactions.map((tx) =>
   <TransactionEntry 
    tx_timestamp = {tx.timestamp}
    tx_ethHash = {tx.ethHash}
    tx_input = {tx.input}
    tx_gas = {tx.gas}
    tx_gasPrice = {tx.gasPrice}
    key = {tx.ethHash}
   />
  );

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <TextField 
          id="outlined-basic" 
          label="Wallet Address" 
          variant="outlined"
          onChange={onWalletTextFieldChange} 
          value={walletAddress}
        />
          <Button color="inherit" onClick={submitWalletAddress}>Submit</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DFK Tax Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <main>
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
