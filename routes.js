const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show'); //2nd component = which page we want to show
//NOTE: If someone go /campaigns/0x2399Abddc show the page /campaigns/show
module.exports = routes;
