import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { fetchDataWiki } from '../../actions/index';

class TrackBlock extends Component {

  componentDidMount() {
    this.loadTrackInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navigation.pathname !== this.props.navigation.pathname) {
      this.loadTrackInfo();
    }
  }

  loadTrackInfo = () => {
    this.props.dispatch(fetchDataWiki(this.props.navigation));
  }

  render() {
    return (
      <div>
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={6}>
              {this.props.selectedTrack.extract
                && (
                <div>
                  <img src={this.props.selectedTrack.originalimage.source} style={{ width: '100%' }} />
                </div>
                )}
            </Grid.Column>
            <Grid.Column width={6}>
              {this.props.selectedTrack.extract
              && (
              <div>
                <h3>{this.props.selectedTrack.displaytitle}</h3>
                {this.props.selectedTrack.extract}
              </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
  navigation: state.navigation,
});
export default connect(mapStateToProps)(TrackBlock);
