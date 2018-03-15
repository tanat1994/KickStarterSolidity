import Web3 from "web3";
//const web3 = new Web3(window.web3.currentProvider);
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //We're in browser and MetaMask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We're on the server *OR* the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/39dLJbJbTURlN70RIdXT'
  );
  web3 = new Web3(provider);
}

export default web3;
