import React, { Component } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../actions';
import { maps } from '../actions/helper';

export class MenuComponent extends Component {
  state = { activeItem: this.props.year }

  handleItemClick = (name) => {
    const url = `/race/${name}/${this.props.season}`;
    this.props.history.push(url);
    this.setState({ activeItem: name });
  }

  handleHompageClick = (e, { name }) => {
    this.props.history.push('/');
    this.setState({ activeItem: name });
    this.props.dispatch(fetchData('', '/home'));
  }

  handleDriverChange = (driver) => {
    const url = `/driver/${driver}/${this.props.year}`;
    this.props.history.push(url);
    this.setState({ activeItem: driver });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing inverted style={{ margin: 0 }}>
          <Menu.Item
            name="home"
            icon="home"
            active={activeItem === 'home'}
            onClick={this.handleHompageClick}
          />
          {this.props.seasonsYears.map((year) => (
            <Menu.Item
              name={year.toString()}
              key={year}
              active={this.props.year == year}
              onClick={() => this.handleItemClick(year)}
            >
              {year}
            </Menu.Item>
          ))}

        </Menu>

        <Menu size="mini" secondary inverted style={{ margin: 0, background: '#22375f' }}>
          <Menu.Item
            name="drivers"
          >
            DRIVERS:
          </Menu.Item>

          <Menu.Menu>
            {maps(this.props.seasonsDrivers).map(z => (
              <Menu.Item
                active={this.props.driverId === this.props.seasonsDrivers[z].Driver.driverId}
                name={this.props.seasonsDrivers[z].Driver.code}
                key={this.props.seasonsDrivers[z].Driver.code}
                style={{ padding: 0 }}
                onClick={() => this.handleDriverChange(this.props.seasonsDrivers[z].Driver.driverId)}
              >
                <Popup
                  trigger={<span>{this.props.seasonsDrivers[z].Driver.code}</span>}
                  content={(
                    <span>
                      {this.props.seasonsDrivers[z].Driver.givenName}
                      {' '}
                      {this.props.seasonsDrivers[z].Driver.familyName}
                    </span>
                  )}
                  position="bottom left"
                />
              </Menu.Item>
            ))
            }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  seasonsDrivers: state.data.seasonsDrivers,
  seasonConstructors: state.data.seasonConstructors,
  seasonsList: state.data.seasonsList || [],
  year: state.navigation.year,
  season: state.navigation.season,
  driverId: state.navigation.driverId,
});

export default withRouter(connect(mapStateToProps)(MenuComponent));
