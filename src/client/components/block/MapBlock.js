import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

class TrackBlock extends Component {
  state = {
    rendered: false,
  }

  render() {
    const trackName = encodeURI(this.props.selectedTrack.displaytitle)
    const mapUrl = "https://maps.google.com/maps/embed/v1/place?key=AIzaSyCoPD33u_4qzMsVkwz84vdqRC98h4xXlcs&q="+trackName +"";

    return (
      <div>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={16}>
                <iframe width="100%" height="600"
src={mapUrl}                        frameBorder="0" scrolling="no" marginHeight="0"
                        marginWidth="0"/>

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
