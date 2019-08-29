import React, { Component }  from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

export class MenuComponent extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.props.history.push(`/race/${Number(name)}/1`)
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          {this.props.seasonsYears.map((x) => (
            <Menu.Item
              name={x}
              key={x}
              active={activeItem == x}
              onClick={this.handleItemClick}
            >
              {x}
            </Menu.Item>
          ))}

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
});

export default withRouter(connect(mapStateToProps)(MenuComponent));

