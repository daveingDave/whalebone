const { test } = require('@playwright/test');

test('API call tests', async () => {
  await fetch('https://qa-assignment.dev1.whalebone.io/api/teams')
    .then(response => response.json())
    .then(data => {
      // Get the count of teams
      const teamsCount = data.teams.length;
      // Find the oldest team
      const oldestTeam = data.teams.reduce((oldest, current) => {
        return oldest.founded < current.founded ? oldest : current;
      });
      const metropolitanTeams = data.teams.filter(team => team.division.name === "Metropolitan").length;
      console.log("Count of teams:", teamsCount);
      console.log("Oldest team:", oldestTeam.name);
      console.log("Number of metropolitan teams are", metropolitanTeams)
    })
    .catch(error => {
      console.error('Error fetching teams:', error);
    });
});
