import axios from 'axios';

// examples of statLeaderboard related api calls
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

// lists all statLeaderboards
const { data: { statLeaderboards } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/statleaderboards/all`,
  headers: {
    'Authorization': 'Bearer ' + token,
  },
});

console.log(statLeaderboards);

if (statLeaderboards.length > 0) {
  // single statLeaderboard data
  const { data: statLeaderboard } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/statleaderboards/${statLeaderboards[0].id}`,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });
  console.log(statLeaderboard);
  // get ranks for statLeaderboard
  const { data: { rankings } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/statLeaderboard/rankings`,
    data: {
      statLeaderboardId: statLeaderboards[0].id,
      limit: 50,
      page: 1,
    }
  });
  console.log(rankings);
  if (statLeaderboard.isTeam) {
    // get rank of specific user's teams
    const { data: { rows: userTeamRanks } } = await axios({
      method: 'GET',
      url: `${DOMAIN}/api/ranking/forCurrentUserForTeamStatLeaderboard`,
      data: {
        userId,
        statId: statLeaderboards[0].statId,
        isNormalized: statLeaderboards[0].isNormalized,
      }
    });
    console.log(userTeamRanks);
  } else {
    // get rank of specific user
    const { data: { rows: userRanks } } = await axios({
      method: 'GET',
      url: `${DOMAIN}/api/ranking/forCurrentUserForStatLeaderboard`,
      data: {
        userId,
        statId: statLeaderboards[0].statId,
        segmentId: statLeaderboards[0].segmentId,
      }
    });
    console.log(userRanks);
  }
}