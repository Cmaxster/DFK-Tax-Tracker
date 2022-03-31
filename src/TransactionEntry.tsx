import React from 'react';
import { useEffect, useState } from 'react';
import { formatEpochToUtc, truncateString, totalGasUsed } from './utilities';
const axios = require('axios');

type props = {
    tx_ethHash: string,
    tx_timestamp: number,
    tx_input: string,
    tx_gas: number,
    tx_gasPrice: number
};

type txReceipt = {
        gasUsed: number
}

var data;

function TransactionEntry(props:props) {
    
    const [decodedInput, setDecodedInput] = useState<string>();
    const [txReceiptData, setTxReceiptData] = useState<txReceipt>({gasUsed:0});

    useEffect(() => {
        data = JSON.stringify({
            "transaction": props.tx_input
        });
        
        axios({url:'http://localhost:3001/decode/'+props.tx_input})
        .then(function (response:any) {
            console.log(response.data.name);
            setDecodedInput(response.data.name)
        }).catch(function (error:any) {
            console.log(error);
            return 'not available'
        });

        axios({url:'http://localhost:3001/receipt/'+props.tx_ethHash})
        .then(function (response:any) {
            setTxReceiptData(response.data)
        }).catch(function (error:any) {
            console.log(error);
            return
        });

    }, [])

    return(
        <tr>
            <td>{ formatEpochToUtc(props.tx_timestamp) }</td>
            <td><a href={"https://explorer.harmony.one/tx/"+props.tx_ethHash}>{ truncateString(props.tx_ethHash, 10)+'(...)' }</a></td>
            <td>{ decodedInput }</td> 
            <td>gas:{txReceiptData.gasUsed}*price:{props.tx_gasPrice}={ totalGasUsed(props.tx_gas, props.tx_gasPrice)+' ONE' }</td> 
        </tr>
    )
}

export default TransactionEntry;