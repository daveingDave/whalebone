const {test, expect} = require('@playwright/test');
const endpointUrl = 'https://qa-assignment.dev1.whalebone.io/api/teams';

// Function to fetch data from the endpoint
async function fetchData() {
  try {
    const response = await fetch(endpointUrl);
    return await response.json();
  } catch (error) {
    console.error('Error fetching teams:', error);
    return null;
  }
}
//function to get number of players from page
async function getNumberOfPlayers(page, text) {
  return await page.$$eval('span', (spans, searchText) => {
    const caseSensitiveSpans = spans.filter(span => span.textContent === searchText);
    return caseSensitiveSpans.length;
  }, text.toUpperCase());
}

test('Count all teams', async () => {
  const data = await fetchData();
  if (!data) return;

  const teamsCount = data.teams.length;
  console.log('Count of teams:', teamsCount);
});

test('Oldest Team & Player Count Test', async ({page}) => {
  test.setTimeout(40000)
  const data = await fetchData();
  if (!data) return;

  const oldestTeam = data.teams.reduce((oldest, current) => {
    return oldest.founded < current.founded ? oldest : current;
  });
  console.log('Oldest team:', oldestTeam.name);

  //use the oldest team url and count the number of CAN and USA players
  await page.goto(oldestTeam.officialSiteUrl + 'roster')
  await page.waitForLoadState('networkidle')
  const numberOfCanadians = await getNumberOfPlayers(page,'can')
  const numberOfAmericans = await getNumberOfPlayers(page, 'usa')
  if (numberOfCanadians > numberOfAmericans) {
    console.log('Team with more players: Canadiens', numberOfCanadians);
  } else if (numberOfCanadians < numberOfAmericans) {
    console.log('Team with more players: Americans', numberOfAmericans);
  } else {
    console.log('Both teams have the same number of players.', numberOfCanadians);
  }
});

test('Number of metropolitan teams', async () => {
  const data = await fetchData();
  if (!data) return;

  const metropolitanTeams = data.teams.filter(team => team.division.name === 'Metropolitan').length;
  console.log('Number of metropolitan teams are', metropolitanTeams);
});

test('More teams', async () => {
  const data = await fetchData();
  if (!data) return;

  const cities = {};
  data.teams.forEach((team) => {
    cities[team.location] = (cities[team.location] || 0) + 1;
  });
  const citiesWithMoreThanOneTeam = Object.entries(cities).filter(([city, count]) => {
    return count >= 2;
  });
  console.log('Cities with 2 or more teams: ', citiesWithMoreThanOneTeam);
  expect(citiesWithMoreThanOneTeam.length).toBeGreaterThan(0);
});

test('The Count and Names of the Metropolitan Teams', async () => {
  const data = await fetchData();
  if (!data) return;

  const metropolitanTeams = data.teams.filter(team => team.division.name === 'Metropolitan')
  const metropolitanTeamNames = metropolitanTeams.map(team => team.name)

  expect(metropolitanTeams.length).toBe(8)
  console.log(`There are ${metropolitanTeams.length} teams in the Metropolitan division, and their names are`, metropolitanTeamNames)
});