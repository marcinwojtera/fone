import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

class TrackBlock extends Component {
  state = {
    rendered: false,
  }

  render() {
    return (
      <div>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.props.selectedTrack.extract &&
                <div>
                  <img src={this.props.selectedTrack.originalimage.source} style={{width: '100%'}}/>
                  <h3>{this.props.selectedTrack.displaytitle}</h3>
                  {this.props.selectedTrack.extract}
                </div>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack
});
export default connect(mapStateToProps)(TrackBlock);
