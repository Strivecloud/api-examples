import axios from 'axios';

// examples of wallet related api calls
const DOMAIN = 'YOUR_STRIVECLOUD_DOMAIN';
const userId = 'INSERT_USERID';
const communityId = '602e33e7aac3ceaee6989ccf'; // default communityId

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

// lists all currencies
const { data: { rows: currencies } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/currency/all`,
});

console.log(currencies);

// lists all wallets for user
const { data: { rows: wallets } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/wallet/balance`,
  headers: {
    'Authorization': 'Bearer ' + token,
  },
  data: {
    userId,
  }
});

console.log(wallets);

// lists all currency bundles
const { data: { rows: bundles } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/currencyBundle/all`,
  data: {
    communityId,
  }
});

console.log(bundles);

if (bundles.length > 0) {
  // single bundle data
  const { data: { row: bundle } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/currencyBundle/byId`,
    data: {
      currencyBundleId: bundles[0].id,
    }
  });
  console.log(bundle);
}