


const formatEpochToUtc = (utcSeconds:number) => {
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    var options = { hour12: false };
    d.setUTCSeconds(utcSeconds);
    return d.toLocaleString('en-US', options);
  }

const truncateString = (str:string, n:number) => {
  return (str.length > n) ? str.substr(0, n-1) : str;
};

const totalGasUsed = (gas:number, gasFee:number) => {
  return (gas * 1e-9) * (gasFee * 1e-9);  
}


export { formatEpochToUtc, truncateString, totalGasUsed };