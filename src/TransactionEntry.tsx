import React from 'react';
import { formatEpochToUtc } from './utilities';
import {Buffer} from 'buffer';
import bs58 from 'bs58';

type props = {
    // using `interface` is also ok
    tx_ethHash: string;
    tx_timestamp: number;
    tx_input: string;
};

//const bs58 = require('bs58');

const decodeBase58 = (address:string) => {
    const bytes = bs58.decode(address)
// See uint8array-tools package for helpful hex encoding/decoding/compare tools
console.log(Buffer.from(bytes).toString('hex'))
    return Buffer.from(bytes).toString('hex');
}

function TransactionEntry(props:props) {

    return(
        <tr key={props.tx_ethHash}>
            <td>{ formatEpochToUtc(props.tx_timestamp) }</td>
            <td><a href={"https://explorer.harmony.one/tx/"+props.tx_ethHash}>{ props.tx_ethHash }</a></td>
            <td>{ decodeBase58(props.tx_input) }</td>
        </tr>
    )
}

export default TransactionEntry;