import web3 from './web3';
import campaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xd2Eb0d088863b9312d1F9158efD8DC3a140Fe61a'
);

export default instance;
