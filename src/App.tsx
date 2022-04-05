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
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { formatEpochToUtc, truncateString, totalGasUsed } from './utilities';

const axios = require('axios');

function App() {

  interface Transaction {
    timestamp: number;
    blockHash: string;
    ethHash: string;
    input: any;
    gas: number;
    gasPrice: number;
    receipt: Receipt;
  }

  interface Receipt {
    gasUsed: Number;
  }
  
  //const [transactions, setTransactions] = useState<Transaction[]>([]);
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

  let rows: GridRowsProp 
  if(transactionData && transactionData.length > 0) rows = transactionData.map(tx => {
    return {
      id: tx.ethHash,
      timestamp: formatEpochToUtc(tx.timestamp),
      ethHash: tx.ethHash,
      input: tx.input,
      gas: tx.receipt.gasUsed 
    } as Object;
  });
  let columns: GridColDef[] = [
    {field: "id", hide: true },
    {field: "timestamp", headerName: "Date", width: 150, },
    {field: "ethHash", headerName: "Address", width: 150, },
    {field: "input", headerName: "Method", width: 150, },
    {field: "gas", headerName: "Gas Fee", width: 150, },
  ]

  useEffect(() => { 
    console.log('>> [app] UseEffect > ')
    //rows 
  },[])

  const renderDataGrid = () =>{
    if(transactionData && transactionData.length > 0) {
      return <DataGrid 
          rows={rows} 
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]} 
        />
    }
  }

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
        {renderDataGrid()}
      </main>
    </div>
  );
}

export default App;
