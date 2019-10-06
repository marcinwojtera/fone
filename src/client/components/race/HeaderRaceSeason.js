import React from 'react';
import { Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const HeaderRaceSeason = () => {
  const seasonHeader = useSelector(state => state.data.seasonsList[state.navigation.season - 1]);
  return (
    <Header as="h3">
      <Header.Content>
        {seasonHeader && (
        <span>
          <span>
            {seasonHeader.raceName} {' '}
          </span>
          <small>
            <span>{seasonHeader.Circuit.circuitName}</span>
          </small>
          <Header.Subheader>
            <span>
                  Round: {' '} {seasonHeader.round} {' '} |
            </span>
            <span>
                  Year: {' '} {seasonHeader.season} {' '} |
            </span>
            <span>
                  Date: {' '} {seasonHeader.date}
            </span>
          </Header.Subheader>
        </span>
        )}
      </Header.Content>
    </Header>
  );
};

export default HeaderRaceSeason;
