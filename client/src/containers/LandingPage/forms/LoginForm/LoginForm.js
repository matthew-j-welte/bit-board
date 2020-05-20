import React from 'react'
import {
  Button,
  Segment,
  Form,
  Grid
} from 'semantic-ui-react'

const LoginForm = (props) => {
  let username = ""
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large'>
          <Segment stacked>
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
        {props.signUpCopmonent}
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm
