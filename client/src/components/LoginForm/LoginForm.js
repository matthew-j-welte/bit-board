import React from 'react'
import {
  Button,
  Segment,
  Form,
  Grid,
  Message,
  Image
} from 'semantic-ui-react'

import GoBookIcon from '../../assets/images/G.svg'

const LoginForm = () => (
  <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large'>
        <Segment stacked>
          <Image fluid centered size="tiny" src={GoBookIcon} />
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