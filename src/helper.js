export function createUrl(year, raceNr) {
  const numberYear = parseInt(year, 10);
  const yearSearch = (!numberYear && numberYear.length != 4)  ? 'current' : numberYear
  const race = isNaN(raceNr) ? '' : `/${raceNr}`;
  return {yearSearch, race}
}
