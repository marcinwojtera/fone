import React from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { find } from 'lodash';

const HeaderRaceSeason = ({ seasonsList, season }) => {
  const seasonHeader = find(seasonsList, {round: season});
  console.log(seasonHeader)
  return (
    <Header as='h3'>
      <Header.Content>
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
        </Header.Subheader>
      </Header.Content>
    </Header>
  )
}


const mapStateToProps = (state) => ({
  seasonsList: state.data.seasonsList,
  season: state.navigation.season,
});
export default connect(mapStateToProps)(HeaderRaceSeason);

