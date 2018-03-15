import React,{ Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout.js';
import { Link } from '../routes';

class CampaignIndex extends Component {

  //This is a server side rendering => EVEN If their browser has closed the JS execute they also can see the
  //address of the contract on the page
  //NOTE: ServerSide Rendering
  static async getInitialProps () {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  //This is client side rendering
  //NOTE: ClientSide rendering
  // async componentDidMount() {
  //   const campaigns = await factory.methods.getDeployedCampaigns().call();
  //   console.log("This is deployedCampaign @: 3" + campaigns);
  // }

  renderCampaigns () {
    const items = this.props.campaigns.map( address => {
        return {
          header: address,
          description: (
            <Link route={`/campaigns/${address}`}>
              <a> View Campaign </a>
            </Link>
          ),
          fluid: true
        };
    }); //Map the address to the card => in this step like foreach
    return < Card.Group items = {items} />;
  }

  render () {
    return (
      <Layout>
        <div>
          <h3> Open Campaign </h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated = "right"
                content = "Create Campaign"
                icon = "add circle"
                primary = {true}
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
