const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../build/CampaignFactory.json'); //Compile only Factory

const provider = new HDWalletProvider(
  'decrease agree prison sure little obvious until pass traffic uncover door universe',
  'https://rinkeby.infura.io/39dLJbJbTURlN70RIdXT'
);

const web3 = new Web3(provider);

const deploy = async () => {
  //TODO get all accounts
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode }) //Lottery Contract has no init argument
  .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deploy to ', result.options.address);
};

deploy();
