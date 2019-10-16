import React from 'react';
import { useSelector } from 'react-redux';
import { Step } from 'semantic-ui-react';

const LeftMenu = ({ driver, race, isFutureRace }) => {
  const season = useSelector(state => state.navigation.season);
  const driverId = useSelector(state => state.navigation.driverId);
  return (
    <Step disabled={isFutureRace} active={driver && (driverId === driver.Driver.driverId) || race && (race.round === season)}>
      <Step.Content>
        <Step.Title>
          {driver ? <span>{driver.Driver.givenName}
            {' '}
            {driver.Driver.familyName}</span> : <span>{race.raceName}</span>}
        </Step.Title>
        <Step.Description>
          <strong>{driver ? driver.Driver.code : race.date}</strong>
          <span className={driver ? 'driver-info' : 'driver-info-number'}>{driver ? driver.Constructors[0].name : race.round}</span>
          {driver && driver.Driver.permanentNumber && <span className="driver-info-number">{driver.Driver.permanentNumber}</span>}
        </Step.Description>
      </Step.Content>
    </Step>
  );
}

export default LeftMenu;
