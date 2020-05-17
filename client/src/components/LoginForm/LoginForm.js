import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Segment,
  Form,
  Grid,
  Message
} from 'semantic-ui-react'

import Logo from '../../components/Logo/Logo'

const LoginForm = (props) => {
  let username = ""
  console.log(username)
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large'>
          <Segment stacked>
            <Logo 
              size="huge" 
              extraStyle={{marginBottom: ".3em"}}
            />
            <Form.Input
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              onChange={(e, { value }) => username = value}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='teal' fluid size='large' onClick={() => props.handler(username)}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm