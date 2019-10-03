import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Dimmer, Step } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { map } from 'lodash';
import TrackResults from '../components/TrackResults';
import LeftMenu from '../components/block/LeftMenu';
import UrlWrapper from '../urlWrapper';
import { getDate } from '../actions/helper';

const Race = ({ seasonsList, seasonsResults, driverId, season, year }) => (
  <div>
    <Dimmer.Dimmable as={Segment} dimmed={false}>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3} style={{ padding: 0 }}>
            <Step.Group size="tiny" fluid vertical style={{ height: 400, background: '#fff' }}>
              {map(seasonsList, raceLink => {
                const isFutureRace = getDate(raceLink.date) - getDate() > 0;
                const race = <LeftMenu race={raceLink} isFeatureRace={isFutureRace} />
                return !isFutureRace ? (
                  <Link
                    className="slide-box"
                    key={raceLink.raceName}
                    to={`/race/${year}/${raceLink.round}`}
                  >
                    {race}
                  </Link>
                ) : <span key={raceLink.raceName} className="slide-box">{race}</span>;
              })}

            </Step.Group>
          </Grid.Column>
          <Grid.Column width={13}>
            {seasonsResults && <TrackResults />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Dimmer.Dimmable>
  </div>
);


const mapStateToProps = state => ({
  seasonsResults: state.data.seasonsResults,
  year: state.navigation.year,
  season: state.navigation.season,
  seasonsList: state.data.seasonsList,
});
export default withRouter(UrlWrapper(connect(mapStateToProps)(Race)));
