import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

class QualifyBlock extends Component {
  state = {
    rendered: false,
  }

  render() {
    return (
      <div>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={16}>
              <div> {this.props.seasonsResults.map(x => (<div key={x.number}> {x.position}  <b>{x.number} - {x.Driver.familyName} - {x.FastestLap && x.FastestLap.Time.time}</b> {x.Constructor.name}</div>))}</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsResults: state.data.seasonsResults ? state.data.seasonsResults.Results : [],
});
export default connect(mapStateToProps)(QualifyBlock);
