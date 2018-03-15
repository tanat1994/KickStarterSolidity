//Before we run the test we need to add some script to package.json
//in "Scripts" change "test":"....." to "test":"mocha"
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//We need to call the compiled version of CampaignFactory
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach ( async () => {
  accounts = await web3.eth.getAccounts();

  //#1 We need to pass in the compiledFactory ABI to web3.eth.Contract(*)
  //#2 The compiledFactory is JSON
  //#3 web3.eth.Contract(*) * -> Constructor in this .Contract does not expect JSON it expect JS
  //#4 We need to add JSON.parse in constructor
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode }) //.deploy statement receive actual bytecode
  .send({ from: accounts[0], gas: '1000000' }); //From account[0]

  await factory.methods.createCampaign('10').send({
    from: accounts[0],
    gas: '1000000'
  });

  const addresses = await factory.methods.getDeployedCampaigns().call(); //Because it is view method so we can call directly w/o fee
  //[campaignAddress] = await .... //This is the other way to access the index 0 in one line
  const campaignAddress = addresses[0];

  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress); //CONFUSING!? LECTURE 134
  //EXPLAIN: factory => we deploy a new contract to the network but
  //campaign => we're not deploy a new contract we alr have a address of the contract which we get from factory
  //campaign has been deployed in line factory = await new .....
});


describe('Campaign Testing', () => {
  it('deploys a factory and campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it('allows people to contribute and add them to approver[]', async () => {
    await campaign.methods.contribute().send({
      value: '102',
      from: accounts[1]
    });

    const isContribute = await campaign.methods.approvers(accounts[1]);
    assert(isContribute);
  });

  it('require a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '1',
        from: accounts[1]
      });
      assert(false);
    } catch(err) {
      assert(err);
    }
  });

  it('allows a manager to payment request', async () => {
    //We do not need to send the money just to test so I choose accounts[1]
    await campaign.methods.createRequest("Create Campaign", 1000, accounts[1])
    .send({
      from: accounts[0],
      gas: '1000000'
    })
    const request = await campaign.methods.requests(0).call(); //Get the value from requests array at index 0
    //Keep in mind requests is a structure ***
    assert.equal("Create Campaign", request.description);
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000'});

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance); //Change string to float
    console.log(balance);
    assert(balance > 103);
  });
});
