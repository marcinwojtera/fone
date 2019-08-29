export function createUrl(year, raceNr) {
  const numberYear = parseInt(year, 10);
  const yearSearch = (!numberYear && numberYear.length != 4)  ? 'current' : numberYear
  const race = isNaN(raceNr) ? '' : `/${raceNr}`;
  return {yearSearch, race}
}

export function findParamsFromUrl(params) {
  console.log(params)
  // const season = parseInt(params.split('/')[2]) ;
  // const year = parseInt(params.split('/')[1]);
  // return {season, year}
}
