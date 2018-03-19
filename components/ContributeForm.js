import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes'; //Curly brackets coz routes.js file exports many properties

class ContributeForm extends Component {
  state = {
    value : '',
    loading : false,
    errorMessage : ''
  };

  onSubmit = async event => {
    event.preventDefault();
    //This file we have access to this.props.access on show.js
    try {
      this.setState({ loading: true, errorMessage: ''});
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.value, 'ether')
      });

      //this.props.address = address of campaign which we're looking at
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }

    this.setState({ loading: false, value: ''});
  };

  render () {
    return (
      //!! double boolean flip
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amout to Contribute</label>
          <Input
            value = {this.state.value}
            onChange = {event => this.setState({ value: event.target.value })}
            label = "ether"
            labelPosition = "right"
          />
        </Form.Field>
        <Message error header="Sorry!" content={this.state.errorMessage}/>
        <Button loading={this.state.loading} primary>
          Contribute!!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm;
