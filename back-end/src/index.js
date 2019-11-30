const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UIDGenerator = require('uid-generator');

const Campaign = require('./campaign.js');
const isCampaign = require('./utils.js');

const app = express();
const uidgen = new UIDGenerator();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

const campaigns = new Map();

// Get all campaigns
app.get('/api/campaigns', async function(req, res) {
  const campaignsRes = [];
  let userToken = req.header('Campaign-Token') || null;
  let hasUserToken = true;

  if (!userToken) {
    hasUserToken = false;

    try {
      userToken = await uidgen.generate();
    } catch (e) {
      console.error(e);
    }
  }

  for (const [key, campaign] of campaigns.entries()) {
    if (campaign.currCap <= campaign.capMaxCount) {
      campaignsRes.push({
        id: campaign.id,
        name: campaign.name,
        data: campaign.data
      });

      if (!hasUserToken || !campaign.currWatchingUserTokens.has(userToken)) {
        ++campaign.currCap;
      }
	  
      const tokenExpiration = new Date(Date.now() + 60000);
      campaign.currWatchingUserTokens.set(userToken, tokenExpiration);
    }
  }

  res.set('Campaign-Token', userToken);
  res.json(campaignsRes);
});

// add a new campaign
app.post('/api/campaigns', function(req, res) {
  const body = req.body;

  if (!campaigns.has(body.id)) {
    if (body && isCampaign(body)) {
      newCampaign = new Campaign(
        body.id,
        body.name,
        body.data,
        body.capMaxCount
      );
      campaigns.set(newCampaign.id, newCampaign);

      res.json(req.body);
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Invalid campaign object'
      });
    }
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Campaign ID already exists'
    });
  }
});

// edit an existing campaign
app.post('/api/campaigns/:_id', function(req, res) {
  const body = req.body;
  const id = req.params._id;

  if (campaigns.has(id) && body && isCampaign(body)) {
    const oldCampaign = campaigns.get(id);

    oldCampaign.name = body.name;
    oldCampaign.data = body.data;
    oldCampaign.capMaxCount = body.capMaxCount;

    res.json(req.body);
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Invalid campaign object'
    });
  }
});

// delete a campaign
app.delete('/api/campaigns/:_id', function(req, res) {
  const id = req.params._id;

  if (campaigns.has(id)) {
    campaigns.delete(id);

    res.json(id);
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Campaign does not exist'
    });
  }
});

function clearUserTokens() {
  for (const [key, campaign] of campaigns.entries()) {
    for (const [
      token,
      expirationTime
    ] of campaign.currWatchingUserTokens.entries()) {
      if (expirationTime < Date.now()) {
        campaign.currWatchingUserTokens.delete(token);
      }
    }
  }
}
setInterval(clearUserTokens, 60000);

app.listen(3000);
console.log('Now serving on port 3001...');
