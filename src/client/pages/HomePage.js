import React, { Component } from 'react';
import { connect } from 'react-redux';
import UrlWrapper from "./urlWrapper";

class HomePage extends Component {

  render() {
    const { route } = this.props;
    return (
      <div>
         <div className="container" style={{height: 500}}>
str glowna
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  navigation: state.navigation,
});
export default connect(mapStateToProps)(UrlWrapper(HomePage))
