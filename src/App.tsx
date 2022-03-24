import React from 'react';
import './App.css';

const axios = require('axios');

// axios.get('https://api.harmony.one?method=hmy_getBalance&params=one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy')
//   .then(response => {
//     console.log(response.data);
//   }, error => {
//     console.log(error);
//   });

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
        "order": "ASC"
    }],
    "id": 1
});

///////////////////////////////////////////////////////

  // "jsonrpc": "2.0",
  // "method": "hmy_getTransactionsHistory",
  // "params": [{
  //     "address": "one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7",
  //     "pageIndex": 0,
  //     "pageSize": 1000,
  //     "fullTx": true,
  //     "txType": "ALL",
  //     "order": "ASC"
  // }],

///////////////////////////////////////////////////////

/// WORKING

// const data = JSON.stringify({
//   "jsonrpc": "2.0",
//   "method": "hmyv2_getBalance",
//   "params": [
//     "0xc6cc22EFDCcDd3f06ce9588798CA2f001EbdEe31"
//   ],
//   "id": 1
// });

///////////////////////////////////////////////////////////

var config = {
  method: 'post',
  url: 'https://api.harmony.one',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response:any) {
  console.log(response);
})
.catch(function (error:any) {
  console.log(error);
});


function App() {

  

  return (
    <div className="App">
      <main>
        <h1>Testing Harmony Blockchain API..</h1>
        <p>{blockTest}</p>
      </main>
    </div>
  );
}

export default App;
