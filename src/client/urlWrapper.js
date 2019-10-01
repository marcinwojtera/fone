import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUrl } from './actions';


function UrlWrapper(HocComponent, props){
  class Wrapp extends  Component {
    componentDidMount() {
      if(this.props.location.pathname !== this.props.navigation.pathname)
      {
        this.setUrl(this.props.match.params, this.props.location.pathname)
      }
    }
    componentDidUpdate() {
      if(this.props.location.pathname !== this.props.navigation.pathname) {
          this.setUrl(this.props.match.params, this.props.location.pathname)
        }
    }
    setUrl = (location, pathname) => this.props.dispatch(changeUrl(location, pathname))

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
