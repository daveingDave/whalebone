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

test('Count teams', async () => {
  const data = await fetchData();
  if (!data) return;

  const teamsCount = data.teams.length;
  console.log("Count of teams:", teamsCount);
});

test('Oldest team', async () => {
  const data = await fetchData();
  if (!data) return;

  const oldestTeam = data.teams.reduce((oldest, current) => {
    return oldest.founded < current.founded ? oldest : current;
  });
  console.log("Oldest team:", oldestTeam.name);
});

test('Number of metropolitan teams', async () => {
  const data = await fetchData();
  if (!data) return;

  const metropolitanTeams = data.teams.filter(team => team.division.name === "Metropolitan").length;
  console.log("Number of metropolitan teams are", metropolitanTeams);
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
  console.log("Cities with 2 or more teams: ", citiesWithMoreThanOneTeam);
  expect(citiesWithMoreThanOneTeam.length).toBeGreaterThan(0);
});