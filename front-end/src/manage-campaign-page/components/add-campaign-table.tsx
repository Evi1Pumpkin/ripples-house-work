import React from 'react';
import { Campaign } from '../../models/campaign.model';
import { addCampaign } from '../../services/campaign-service';

class AddCampaignTable extends React.Component<any, { campaign: Campaign }> {
  constructor(props: { onChange: Function }) {
    super(props);

    this.state = {
      campaign: { id: '', name: '', data: '{}', capMaxCount: 100 }
    };
  }

  private updateCampaignData(event: any) {
    const newCampaignState: any = { ...this.state.campaign };

    newCampaignState[event.target.name] = event.target.value;

    this.setState({ campaign: newCampaignState });
  }

  private AddNewCampaign() {
    addCampaign(
      this.state.campaign.id,
      this.state.campaign.name,
      Number(this.state.campaign.capMaxCount) || 100,
      JSON.parse(this.state.campaign.data as string)
    )
      .then(() => this.props.onChange())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Add a new campaign:</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Data</th>
              <th>Max Cap</th>
            </tr>
          </thead>
          <tbody>
            <tr onChange={e => this.updateCampaignData(e)}>
              <td>
                <input type="text" name="id" defaultValue="" />
              </td>
              <td>
                <input type="text" name="name" defaultValue="" />
              </td>
              <td>
                <input type="text" name="data" defaultValue="{}" />
              </td>
              <td>
                <input type="text" name="capMaxCount" defaultValue="100" />
              </td>
              <td>
                <button onClick={() => this.AddNewCampaign()}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AddCampaignTable;
