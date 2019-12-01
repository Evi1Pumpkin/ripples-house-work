import React from 'react';
import { Campaign } from '../../models/campaign.model';
import {
  removeCampaign,
  updateCampaign,
  getAllManagedCampaigns
} from '../../services/campaign-service';

type Props = {
  campaigns: Campaign[];
  onChange: Function;
};

class EditCampaignTable extends React.Component<
  Props,
  { campaigns: Map<string, Campaign> }
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      campaigns: new Map(
        props.campaigns.map((campaign: Campaign) => [campaign.id, campaign])
      )
    };
  }

  componentWillReceiveProps(props: Props) {
    this.convertCampaignArrayToMap(props.campaigns);
  }

  private convertCampaignArrayToMap(arr: Campaign[]) {
    const newCampaignState = new Map(
      arr.map((campaign: Campaign) => [campaign.id, campaign])
    );

    this.setState({ campaigns: newCampaignState });
  } // export to utils

  private updateCampaignData(id: string, event: any) {
    const newCampaignState: Map<string, Campaign> = new Map(
      this.state.campaigns
    );

    newCampaignState.set(id, {
      ...(newCampaignState.get(id) as Campaign),
      [event.target.name]: event.target.value
    });
    this.setState({ campaigns: newCampaignState });
  }

  private saveCampaign(campaign: Campaign) {
    updateCampaign(
      campaign.id,
      campaign.name,
      Number(campaign.capMaxCount) || 100,
      campaign.data
    )
      .then(() => this.props.onChange())
      .catch(error => {
        console.log(error);
      });
  }

  private deleteCampaign(id: string) {
    removeCampaign(id)
      .then(() => this.props.onChange())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const campaignRows = Array.from(this.state.campaigns.values()).map(
      (campaign: any) => {
        return (
          <tr
            key={campaign.id.toString()}
            onChange={e => this.updateCampaignData(campaign.id, e)}
          >
            <td>
              <input type="text" name="name" defaultValue={campaign.name} />
            </td>
            <td>
              <input type="text" name="data" defaultValue={campaign.data} />
            </td>
            <td>
              <input
                type="text"
                name="capMaxCount"
                defaultValue={campaign.capMaxCount}
              />
            </td>
            <td>
              <button onClick={() => this.saveCampaign(campaign)}>Save</button>
            </td>
            <td>
              <button onClick={() => this.deleteCampaign(campaign.id)}>
                Remove
              </button>
            </td>
          </tr>
        );
      }
    );
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Data</th>
              <th>Max Cap</th>
            </tr>
          </thead>
          <tbody>{campaignRows}</tbody>
        </table>
      </div>
    );
  }
}

export default EditCampaignTable;
