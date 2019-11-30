import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CampaignPage from './campaign-page/campaign-page';
import ManageCampaignPage from './manage-campaign-page/manage-campaign-page';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CampaignPage} />
        <Route path="/manage" component={ManageCampaignPage} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
