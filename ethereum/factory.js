import web3 from './web3';
import campaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0x5f6a2cDB268aD1578C6788aAf505e5073A74f6C1'
);

export default instance;
