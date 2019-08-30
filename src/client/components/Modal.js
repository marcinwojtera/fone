import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalDriver = ({ open, data }) => (
  <Modal trigger={<Button>Basic Modal</Button>}  size='large'>
    <Header icon='user' content='Lewis Hamilton' />
    <Modal.Content>
      {data}
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalDriver
