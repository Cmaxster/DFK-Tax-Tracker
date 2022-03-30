import React from 'react';
import { useEffect, useState } from 'react';
import { formatEpochToUtc, truncateString } from './utilities';
const axios = require('axios');

type props = {
    tx_ethHash: string;
    tx_timestamp: number;
    tx_input: string;
    tx_gas: number;
};

var data;

var config = {
    method: 'get',
    url: 'http://localhost:3001/decode',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
};

const decodeTxData = (address:string) => {
    
}

function TransactionEntry(props:props) {
    useEffect(() => {
        data = JSON.stringify({
            "transaction": props.tx_input
        });
        
        
        axios({url:'http://localhost:3001/decode/'+props.tx_input})
        .then(function (response:any) {
            console.log(response.data.name);
            setDecodedInput(response.data.name)
        })
        .catch(function (error:any) {
            console.log(error);
            return 'not available'
        });

    }, [])

    const [decodedInput, setDecodedInput] = useState<string>();

    return(
        <tr>
            <td>{ formatEpochToUtc(props.tx_timestamp) }</td>
            <td><a href={"https://explorer.harmony.one/tx/"+props.tx_ethHash}>{ truncateString(props.tx_ethHash, 10)+'(...)' }</a></td>
            <td>{ decodedInput }</td> 
            <td>{ props.tx_gas+' ONE' }</td> 
        </tr>
    )
}

export default TransactionEntry;