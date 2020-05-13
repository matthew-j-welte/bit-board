import React from 'react'
import {
  Button,
  Segment,
  Form,
  Grid,
  Message,
} from 'semantic-ui-react'

import Logo from '../../components/Logo/Logo'

const LoginForm = () => (
  <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large'>
        <Segment stacked>
          <Logo 
            size="huge" 
            extraStyle={{marginBottom: ".3em"}}
          />
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)

export default LoginForm