import fetch from 'node-fetch';

export const BACK_FETCH_DRIVER = 'BACK_FETCH_DRIVER';

export const loadDriver = year => dispatch => {
  const driverTable = () => fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(data => data.json())
    .catch(err => console.log(err));

  Promise.all([driverTable(year)]).then(values => {

    console.log(values)
    // dispatch({
    //   type: BACK_FETCH_DRIVER,
    //   payload: { year, values },
    // });
  });
};
