import axios from 'axios';

const DOMAIN = 'YOUR_STRIVECLOUD_DOMAIN';
const random = Math.random().toString().slice(2, 7);

// generate token for your admin account in order to authenticate further api calls.
const { data: { token } } = await axios({
  method: 'POST',
  url: `${DOMAIN}/api/auth/generateToken`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
  }
});

// insert a user in the strivecloud system
// returns users strivecloud id
const { data: { userId } } = await axios({
  method: 'POST',
  url: `${DOMAIN}/api/user/insert`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  data: {
    externalId: 'external_id_' + random, // userId in your system
  }
});

// create a stat to track event count for users
const { data: { id: statId } } = await axios({
  method: 'POST',
  url: `${DOMAIN}/api/eventStat`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  data: {
    name: { en: 'my_test_stat_' + random },
    description: { en: 'my_test_stat' },
    config: {
      event: 'book.read',
      type: 'CUSTOM',
      period: 'FROM_STAT_CREATION',
      measure: 'COUNT',
    }
  }
});

// create a milestone users can unlock
await axios({
  method: 'POST',
  url: `${DOMAIN}/api/milestones`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  data: {
    title: { en: 'my_test_milestone_' + random },
    description: { en: 'my_test_milestone' },
    statId,
    icon: 'https://storage.strivecloud.io/development/images/communities/sc-communityicon.png',
    goal: 1,
  }
});

// trigger an event for your user
await axios({
  method: 'POST',
  url: `${DOMAIN}/api/webhook/event/custom`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  data: {
    event: 'book.read',
    dt: new Date().toISOString(),
    userId,
    data: { title: 'book' }, // extra data for the event that can be used for stat setup
  }
});

await new Promise(resolve => setTimeout(resolve, 10000)); // Sleep for 10 seconds to allow for processing/updates
// fetches a user's data (profile, level, milestones, stats, wallets, tiers etc)
const { data } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/users/admin/getFullProfile`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  data: {
    event: 'book.read',
    dt: new Date().toISOString(),
    userId,
    data: { title: 'book' }, // extra data for the event that can be used for stat setup
  }
});

console.log(data);