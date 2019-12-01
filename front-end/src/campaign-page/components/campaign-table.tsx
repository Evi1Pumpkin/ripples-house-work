import React from 'react';
import PropTypes from 'prop-types';
import { Campaign } from '../../models/campaign.model';

const CampaignTable = (props: {campaigns: Campaign[]}) => {
    const campaigns = props.campaigns;

    const campaignRows = campaigns.map((campaign: any) => {
        return (
            <tr key={campaign.id.toString()}>
                <td>{campaign.name}</td>
                <td>{JSON.stringify(campaign.data)}</td>
            </tr>
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {campaignRows}
                </tbody>
            </table>
        </div>
    );
};

CampaignTable.propTypes = {
    campaigns: PropTypes.array
};

export default CampaignTable;