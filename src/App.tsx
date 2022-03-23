import React from 'react';
import './App.css';
// import * as crypto from '@harmony-js/crypto';
// import * as utils from '@harmony-js/utils';
import * as core from '@harmony-js/core';
import {Buffer} from 'buffer';

const { Harmony } = require('@harmony-js/core');

const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

const hmy = new Harmony(
  'https://api.s0.b.hmny.io/',
  {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyTestnet,
  },
);

var blockTest:Number;

hmy.blockchain
  .getBalance({ address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7' })
  .then((response:any) => {
    blockTest = fromWei(hexToNumber(response.result), Units.one);
    //console.log('balance in ONEs: ' + fromWei(hexToNumber(response.result), Units.one));
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
