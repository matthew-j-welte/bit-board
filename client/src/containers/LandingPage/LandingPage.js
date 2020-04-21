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
} from 'semantic-ui-react'

import axios from "axios";

const endpoint = "http://localhost:8080"
const getWidth = () => window.innerWidth

const HomepageHeading = (props) => (
    <Container text>
      <Header
        as='h1'
        color="blue"
        content='GoBook'
        inverted
        style={{
          fontSize: '10em',
          fontWeight: 'normal',
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
          marginTop: '0.2em',
        }}
      />
      <Button primary size='huge'>
        Begin
        <Icon
          fitted 
          name='power off'
          style={{padding: 4}}
        />
      </Button>
    </Container>
)


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
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
            style={{ minHeight: 1500, padding: '1em 0em' }}
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
                        <Button as='a' color="blue">Signup</Button>
                        <Button.Or />
                        <Button as='a' color="blue">Login</Button>
                    </Button.Group>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading userCount={this.state.userCount}/>
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}

export default LandingPage