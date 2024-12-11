import Web3 from "web3";
import ABI from "../app/ABI.json";

let web3: Web3 | undefined;
let contract: any; 

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    const contractAddress = "0xf0a63852f468930263a56c9208252637715f69cf"; // ganti dengan address contract kalian
    contract = new (web3 as any).eth.Contract(ABI, contractAddress); 
} else {
    console.log('Ethereum wallet not detected. Please install MetaMask or another wallet.');
}

export { web3, contract };
