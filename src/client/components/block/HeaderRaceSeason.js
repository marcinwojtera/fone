import React from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { find } from 'lodash';

const HeaderRaceSeason = ({ seasonsList, season }) => {
  const seasonHeader = find(seasonsList, {round: season});

  return (
    <Header as='h3'>
      <Header.Content>
        {seasonHeader && <span>
          <span>{seasonHeader.raceName} </span>
        <small>(<span>{seasonHeader.Circuit.circuitName}</span>)</small>
        <Header.Subheader>
                <span>
                  Round: {seasonHeader.round} |
                </span>
                <span>
                  Year: {seasonHeader.season} |
                </span>
                <span>
                  Date: {seasonHeader.date}
                </span>
        </Header.Subheader> </span>}
      </Header.Content>
    </Header>
  )
}


const mapStateToProps = (state) => ({
  seasonsList: state.data.seasonsList,
  season: state.navigation.season,
});
export default connect(mapStateToProps)(HeaderRaceSeason);

