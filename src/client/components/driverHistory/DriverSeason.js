import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const DriverSeason = () => {
  const seasons = useSelector((state) => !!state.driverHistory[state.navigation.year] ? state.driverHistory[state.navigation.year].drivers : []);

  return (
    <Table.Body>
      {seasons.map(season => (
        <Table.Row key={season.circuit.raceName} error={season.data.positionText == 'R'}>
          <Table.Cell>{season.circuit.raceName}</Table.Cell>
          <Table.Cell>
            {season.data.positionText == 'R' ? <Label ribbon color="red">R</Label>
              : (<span><b>{season.data.position}</b> </span>)}
          </Table.Cell>
          <Table.Cell>
            {season.data.points !== '0' ? (<span> +{season.data.points} </span>) : <span>0</span>}
          </Table.Cell>
          <Table.Cell>{season.data.grid}</Table.Cell>
          <Table.Cell>

            {season.data.FastestLap && (
              <span className="driver-box"> {season.data.FastestLap.Time.time}
                <span className="lap-place-box">
                    Lap: {season.data.FastestLap.lap}, Time rank: {season.data.FastestLap.rank}
                 </span>
              </span>
            )}

          </Table.Cell>
          <Table.Cell>
            {season.data.FastestLap && (
              <span> {season.data.FastestLap.AverageSpeed.speed} {' '} <small>km/h</small> </span>
            )}
          </Table.Cell>
          <Table.Cell>{season.data.status}</Table.Cell>
        </Table.Row>
      ))
      }

    </Table.Body>
  );
}

export default DriverSeason;
