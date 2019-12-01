import React from 'react';
import { render } from 'react-dom';
import {getAllCampaigns} from './../services/campaign-service'
import CampaignTable from './components/campaign-table';
import { Campaign } from '../../../.history/front-end/src/models/campaign.model_20191201182946';

class CampaignPage extends React.Component<any,  { campaigns: Campaign[], userToken: String}> {
  constructor(props: any) {
    super(props);
  
    this.state = {
        campaigns : [],
        userToken: ""
    };
}

private intervalId: any;
    
componentDidMount() {
  this.intervalId = setInterval(() => {
    this.listCampaigns();
  }, 1000)
}

componentWillUnmount() {
  clearInterval(this.intervalId);
}

listCampaigns() {
    getAllCampaigns(this.state.userToken)
        .then(({campaigns, userToken}) => {
          this.setState({userToken});
          this.setState({campaigns});
        })
        .catch(error => {
          console.log(error);
        });
}

  render() {
    return( 
      <div>
        <h1>Welcome to our campaign page! </h1>
        <CampaignTable campaigns={this.state.campaigns} />
      </div>
      );
  }
}

export default CampaignPage;
