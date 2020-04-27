import React from 'react'
import {
  Button,
  Segment,
  Form,
  Grid,
  Message,
  Image,
} from 'semantic-ui-react'

import DarkGoBookLogo from '../../assets/images/DarkGoBook.svg'

const LoginForm = () => (
  <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large'>
        <Segment stacked>
          <Image fluid centered size="small" style={{marginBottom: "2em"}} src={DarkGoBookLogo} />
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