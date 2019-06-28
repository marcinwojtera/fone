export const BACK_FETCH_DRIVERS = 'BACK_FETCH_DRIVERS';
// export const FETCH_SEASONS = 'FETCH_SEASONS';

export const fetchData = getData => dispatch => {

  const obj = {
    constructorList: getData.constructorStandings || [],
    driversList: getData.driverStandings || [],
    raceList: getData.raceList || [],
    raceResults: getData.raceResults || []
  };
  dispatch({
    type: BACK_FETCH_DRIVERS,
    payload: getData
  });


};
