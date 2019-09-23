import React, { Component }  from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import {connect} from "react-redux";
import { changeUrl } from '../actions'

export class MenuComponent extends Component {
  state = { activeItem: this.props.year }

  handleItemClick = (e, { name }) => {
    this.props.history.push(`/race/${name}/1`)
    this.setState({ activeItem: name })
  }
  handleHompageClick = (e, { name }) => {
    this.props.history.push(`/`)
    this.setState({ activeItem: name });
    // this.setUrl(this.props.match.params, this.props.location.pathname)
   this.props.dispatch(changeUrl('', '/home'))

  }
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing inverted>
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
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  year: state.navigation.year,
});

export default withRouter(connect(mapStateToProps)(MenuComponent));

