import React, { Component }  from 'react';
import { Menu, Dropdown, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {connect} from "react-redux";
import { changeUrl } from '../actions'
import { map } from 'lodash'

export class MenuComponent extends Component {
  state = { activeItem: this.props.year }

  handleItemClick = (e, { name }) => {
    this.props.history.push(`/race/${name}/1`)
    this.setState({ activeItem: name })
  }
  handleHompageClick = (e, { name }) => {
    this.props.history.push(`/`)
    this.setState({ activeItem: name });
    this.props.dispatch(changeUrl('', '/home'))
  }
  handleDriverChange = (driver) => {
    const url = `/driver/${driver}/${this.props.year}`
    this.props.history.push(url)
    this.setState({ activeItem: name });
    this.props.dispatch(changeUrl('', url))
  }


  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing inverted style={{margin :0}}>
          <Menu.Item
            name='home'
            icon='home'
            active={activeItem === 'home'}
            onClick={this.handleHompageClick}
          />
          {this.props.seasonsYears.map((x) => (
            <Menu.Item
              name={x.toString()}
              key={x}
              active={activeItem == x}
              onClick={this.handleItemClick}
            >
              {x}
            </Menu.Item>
          ))}
          <Menu.Menu position='right'>
          <Dropdown item text='Languages'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Polish</Dropdown.Item>
              <Dropdown.Item>German</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>
        </Menu>

        <Menu size='mini' secondary inverted style={{margin :0, background: '#37383e' }}>
          <Menu.Item
            name='drivers'
          >
            DRIVERS:
          </Menu.Item>
          <Menu.Menu>
            {map(this.props.seasonsDrivers, z => {
              return ( <Menu.Item
                active={this.props.driverId === z.Driver.driverId }
                name={z.Driver.code}
                key={z.Driver.code}
                style={{padding: 0}}
                onClick={()=> this.handleDriverChange(z.Driver.driverId)}
              >

                <Popup
                  trigger={<span>{z.Driver.code}</span>}
                  content={<span>{z.Driver.givenName} {z.Driver.familyName}</span>}
                  position='bottom left'
                />
            </Menu.Item>)
            })}
          </Menu.Menu>

        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  seasonsDrivers: state.data.seasonsDrivers,
  seasonsList: state.data.seasonsList || [],
  year: state.navigation.year,
  driverId: state.navigation.driver,
});

export default withRouter(connect(mapStateToProps)(MenuComponent));

