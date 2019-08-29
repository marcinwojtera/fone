import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUrl } from '../actions';


function UrlWrapper(HocComponent, props){
  class Wrapp extends  Component {
    componentDidMount() {
      this.setUrl(this.props.match.params)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params !== this.props.navigation) {
          this.setUrl(this.props.match.params)
        }
    }
    setUrl = (location) => this.props.dispatch(changeUrl(location))

    render(){
      return (
        <HocComponent {...this.props}>{this.props.children}</HocComponent>
      );
    }
  }
  const mapStateToProps = state => ({
    navigation: state.navigation,
  });

  return connect(mapStateToProps)(Wrapp);
}
export default UrlWrapper;
