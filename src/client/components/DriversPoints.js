import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Table } from 'semantic-ui-react'


class DriversPoints extends Component {
  state = {
    rendered: false
  }
  shouldComponentUpdate(){
    if(!this.state.rendered){
      this.setState({rendered: true});
      return true;
    }
    return false;
  }
  componentWillUpdate(nextProps) {
    console.log(nextProps)
    if (nextProps.seasonsResults != this.props.seasonsResults) {
    }
  }
  render() {
    return (
      <div>
 {this.props.seasonsResults.map(x => (<div key={x.id}> {x.body} </div>))}
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsResults: state.data,
});
export default connect(mapStateToProps)(DriversPoints);

