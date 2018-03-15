import web3 from './web3';
import campaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xE97C9B9E00F720cF839C21919834b6f52229Abcc'
);

export default instance;
