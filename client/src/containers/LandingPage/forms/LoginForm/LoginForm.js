import React from 'react'
import {
  Button,
  Segment,
  Form,
  Grid
} from 'semantic-ui-react'

const LoginForm = (props) => {
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      <Segment textAlign="center" stacked style={{ maxWidth: 450 }}>
        <Form>
            <Form.Input
              icon='user' 
              iconPosition='left' 
              placeholder='Username' 
              onChange={(event, data) => props.onChangeHandler(event, data, "username")}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(event, data) => props.onChangeHandler(event, data, "password")}
            />
            <Button color='teal' fluid size='large' onClick={() => props.handler()}>
              Login
            </Button>
        </Form>
        </Segment>
        {props.signUpCopmonent}
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm
