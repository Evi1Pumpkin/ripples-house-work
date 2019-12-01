import React from 'react';
import { Campaign } from '../models/campaign.model';
import { getAllManagedCampaigns } from '../services/campaign-service';
import EditCampaignTable from './components/edit-campaign-table';
import AddCampaignTable from './components/add-campaign-table';

class ManageCampaignPage extends React.Component<any, { campaigns: Campaign[]}> {
  constructor(props: any) {
    super(props);
  
    this.state = {
        campaigns: []
    };
}

componentDidMount() {
  this.listCampaigns();
}

listCampaigns() {
  getAllManagedCampaigns()
        .then(campaigns => {
            this.setState({campaigns});
        })
        .catch(error => {
            console.log(error);
        });
}
  render() {
    return( 
      <div>
        <h1>Welcome to our Campaign Management page! </h1>
        <EditCampaignTable campaigns={this.state.campaigns} onChange={this.listCampaigns.bind(this)}/>
        <br></br>
        <AddCampaignTable onChange={this.listCampaigns.bind(this)}/>
      </div>
      );
  }
}

export default ManageCampaignPage;
