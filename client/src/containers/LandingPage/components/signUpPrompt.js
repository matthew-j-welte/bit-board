import React from 'react'
import {
  Button,
  Message,
  Modal
} from 'semantic-ui-react'

const SignUpPrompt = (props) => (
  <Message style={{ maxWidth: 450 }}>
    New to us? 
    <Modal trigger={props.trigger}>
      <Modal.Header>Create Your Account</Modal.Header>
        <Modal.Content>
          {props.signUpForm}
        </Modal.Content>
    </Modal>
  </Message>
)

export default SignUpPrompt