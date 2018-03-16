import React, {Component} from 'react';
import Layout from '../../components/Layout.js';

class CampaignShow extends Component {
  static async getInitialProps (props) {
    console.log(props.query.address); //Print address from the url
    return {};
  }

  render () {
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    );
  }
}

export default CampaignShow;
