import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class ModalDriver extends Component {
  componentDidMount() {
    console.log('sdfsdfsd')
  }

  render (){
    return (
      <Modal open={this.props.open}  size='large'>
        <Header icon='user' content='Lewis Hamilton' />
        <Modal.Content>
          {this.props.data}
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> N
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
export default ModalDriver
