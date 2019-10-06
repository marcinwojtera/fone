import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Step } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TrackResults from '../components/TrackResults';
import LeftMenu from '../components/block/LeftMenu';
import UrlWrapper from '../urlWrapper';
import { getDate, maps } from '../actions/helper';

const Race = () => {
  const year = useSelector(state => state.navigation.year);
  const seasonsList = useSelector(state => state.data.seasonsList);
  return (
    <div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3} style={{ padding: 0 }}>
            <Step.Group size="tiny" fluid vertical style={{ height: 400, background: '#fff' }}>

              {maps(seasonsList).map(raceLink => {
                const isFutureRace = getDate(seasonsList[raceLink].date) - getDate() > 0;
                const race = <LeftMenu race={seasonsList[raceLink]} isFeatureRace={isFutureRace} />;
                return !isFutureRace ? (
                  <Link
                    className="slide-box"
                    key={seasonsList[raceLink].raceName}
                    to={`/race/${year}/${seasonsList[raceLink].round}`}
                  >
                    {race}
                  </Link>
                ) : <span key={seasonsList[raceLink].raceName} className="slide-box">{race}</span>;
              })}
            </Step.Group>
          </Grid.Column>
          <Grid.Column width={13}>
            <TrackResults />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default UrlWrapper(Race);


