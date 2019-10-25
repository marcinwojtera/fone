import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from './actions';


function UrlWrapper(HocComponent) {
  class Wrapp extends Component {
    componentDidMount() {
      if (this.props.location.pathname !== this.props.navigation.path) this.setUrl(this.props.location.pathname );
    }

    componentDidUpdate(prevProps) {
      if ((prevProps.location.pathname.toString() !==  this.props.location.pathname.toString())) this.setUrl(this.props.location.pathname);
    }

    setUrl = (pathname) => this.props.dispatch(fetchData(pathname))

    render() {
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
