import axios from 'axios';

// examples of challenge related api calls
const DOMAIN = 'YOUR_STRIVECLOUD_DOMAIN';
const userId = 'INSERT_USERID';
const communityId = '602e33e7aac3ceaee6989ccf'; // default communityId

// lists all challenge categories
const { data: { rows: categories } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/category/all`,
  data: {
    type: 'MILESTONE',
  },
});

console.log(categories);

// lists the available classic challenges
const { data: { rows: milestones } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/milestone/forCategory`,
});

console.log(milestones);

if (milestones.length > 0) {
  // single milestone data
  const { data: { row: milestone } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/milestone/byId`,
    data: {
      milestoneId: milestones[0].id,
    }
  });
  console.log(milestone);
  // fetch rewards for the milestone
  const { data: { rows: rewards } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/reward/allForObjectWithInfo`,
    data: {
      objectId: milestones[0].id,
      objectType: 'milestone',
    }
  });
  console.log(rewards);
}

// fetches classic challenges with the users progress for them
const { data: { rows: userProgress } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/milestone/forUserWithStatus`,
  data: {
    userId,
  }
});

console.log(userProgress);

// fetches claimed classic challenges for user
const { data: { rows: claimedForUser } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/milestone/claimedForCategoryForUser`,
  data: {
    userId,
  }
});

console.log(claimedForUser);


// lists the active timebound challenges
const { data: { rows: timedChallenges } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/timedChallenge/getAllActive`,
  data: {
    communityId
  }
});

console.log(timedChallenges);

if (timedChallenges.length > 0) {
  // single timedChallenge data
  const { data: { row: challenge } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/timedChallenge/byId`,
    data: {
      timedChallengeId: timedChallenges[0].id,
    }
  });
  console.log(challenge);
  // fetch rewards for the timedChallenge
  const { data: { rows: rewards } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/reward/allForObjectWithInfo`,
    data: {
      objectId: timedChallenges[0].id,
      objectType: 'timedChallenge',
    }
  });
  console.log(rewards);

  // fetches userProgress for a specific timedChallenge
  const { data: { row: timedChallengeProgress } } = await axios({
    method: 'GET',
    url: `${DOMAIN}/api/timedChallenge/progressForForUser`,
    data: {
      userId,
      timedChallengeId: timedChallenges[0].id,
    }
  });
  console.log(timedChallengeProgress);
}


// fetches claimed classic challenges for user
const { data: { rows: claimedChallengesForUser } } = await axios({
  method: 'GET',
  url: `${DOMAIN}/api/timedChallenge/completedForUser`,
  data: {
    userId,
    communityId,
  }
});

console.log(claimedChallengesForUser);