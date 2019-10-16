import React from 'react';
import { useSelector } from 'react-redux';

const DriverRow = ({ driver, homeView, constructorData, driverData }) => {

  const driverDatas = useSelector(state => {
    return homeView ? driverData : state.data.seasonsDrivers[driver].Driver;
  });
  const constructorDatas = useSelector(state => {
    return homeView ? constructorData : state.data.seasonsDrivers[driver].Constructors[0];
  });

  return (
    <div className="driver-box">
        <span className="info">
          {driverDatas.givenName} {driverDatas.familyName}
          <small><i> ({driverDatas.number || driverDatas.permanentNumber})
            <small> {driverDatas.code}</small></i></small>
        </span>
      <span className="constructor-box">{constructorDatas.name}</span>
    </div>
  );
};

export default DriverRow;
