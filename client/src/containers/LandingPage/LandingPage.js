import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Form,
  Grid,
  Image,
  Message
} from 'semantic-ui-react'

import InfoBox from '../../components/InfoBox/InfoBox'

import axios from "axios";

const endpoint = "http://localhost:8080"
const getWidth = () => window.innerWidth

const LoginForm = () => (
  <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large'>
        <Segment stacked>
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

const HomepageHeading = (props) => (
    <Container text>
      <Header
        as='h1'
        color="teal"
        content='GoBook'
        inverted
        style={{
          fontSize: '10em',
          marginBottom: 0,
          marginTop: '1em',
        }}
      />
      <Header
        as='h2'
        content={"Over " + props.userCount + " users and counting!"}
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'bold',
          marginTop: '0em',
        }}
      />
      <LoginForm/>
    </Container>
)

class LandingPage extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      userCount: 0
    }
  }

  setUserCount = () => {
    axios.get(endpoint + "/api/users/count").then(res => {
      console.log(res)
      if (res.data) {
        console.log(res.data)
        this.setState({
          userCount: res.data.count
        });
      }
    });
  };

  componentDidMount() {
    this.setUserCount();
  }

  render() {
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 1500, padding: '2em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                    <Button.Group>
                        <Button as='a' color="teal">Signup</Button>
                        <Button.Or />
                        <Button as='a' color="teal">Login</Button>
                    </Button.Group>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading userCount={this.state.userCount}/>
            <InfoBox
              containerStyle={{padding: '8em 0em 0em 0em' }}
              header="Explore"
              infoText="Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Mauris a diam maecenas sed enim ut sem viverra. In metus vulputate eu scelerisque felis. Sed augue lacus viverra vitae congue. Sed risus ultricies tristique nulla. In massa tempor nec feugiat nisl pretium fusce. Non consectetur a erat nam at. Aliquet nec ullamcorper sit amet risus nullam. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Nunc consequat interdum varius sit. Ut lectus arcu bibendum at varius. Facilisis mauris sit amet massa. Eget nulla facilisi etiam dignissim. Orci porta non pulvinar neque laoreet suspendisse interdum. Id ornare arcu odio ut sem nulla pharetra diam sit. Ut enim blandit volutpat maecenas volutpat blandit. Mi in nulla posuere sollicitudin aliquam. Quis blandit turpis cursus in. Eu facilisis sed odio morbi quis commodo odio aenean. Pharetra diam sit amet nisl suscipit adipiscing."
            />
            <InfoBox
              header="Rank Up"
              infoText="Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Mauris a diam maecenas sed enim ut sem viverra. In metus vulputate eu scelerisque felis. Sed augue lacus viverra vitae congue. Sed risus ultricies tristique nulla. In massa tempor nec feugiat nisl pretium fusce. Non consectetur a erat nam at. Aliquet nec ullamcorper sit amet risus nullam. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Nunc consequat interdum varius sit. Ut lectus arcu bibendum at varius. Facilisis mauris sit amet massa. Eget nulla facilisi etiam dignissim. Orci porta non pulvinar neque laoreet suspendisse interdum. Id ornare arcu odio ut sem nulla pharetra diam sit. Ut enim blandit volutpat maecenas volutpat blandit. Mi in nulla posuere sollicitudin aliquam. Quis blandit turpis cursus in. Eu facilisis sed odio morbi quis commodo odio aenean. Pharetra diam sit amet nisl suscipit adipiscing."
            />
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}

export default LandingPage