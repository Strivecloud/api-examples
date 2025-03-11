import axios from 'axios';

// examples of tier related api calls
const DOMAIN = 'YOUR_STRIVECLOUD_DOMAIN';
const userId = 'INSERT_USERID';

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

// lists all tierSystems
const { data: { rows: tierSystems } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/tierSystem/all`,
});

console.log(tierSystems);

// lists all tiers for user
const { data: { rows: userTiers } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/tierSystem/forUser`,
  headers: {
    'Authorization': 'Bearer ' + token,
  },
  data: {
    userId,
  }
});

console.log(userTiers);