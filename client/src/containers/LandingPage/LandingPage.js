import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility
} from 'semantic-ui-react'

import InfoBox from '../../components/InfoBox/InfoBox'
import LoginForm from '../../components/LoginForm/LoginForm'

import BitBoardLogo from '../../assets/images/BitBoard.svg'

import axios from "../../axios";

const getWidth = () => window.innerWidth

const HomepageHeading = (props) => (
    <Container>
      <Image centered size="massive" style={{padding: "1em 1em 6em 1em"}} src={BitBoardLogo}/>
      <Header
        as='h3'
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
    this.state = {
      userCount: 0
    }
  }

  setUserCount = () => {
    axios.get("/api/users/count").then(res => {
      if (res.data) {
        this.setState({
          userCount: res.data
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
            style={{ minHeight: 1500, padding: '0em 0em 6em 0em' }}
            vertical
          >
            <HomepageHeading userCount={this.state.userCount}/>
            <InfoBox
              containerStyle={{padding: '8em 0em 0em 0em' }}
              inverted
              header="Explore"
              infoText="Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Mauris a diam maecenas sed enim ut sem viverra. In metus vulputate eu scelerisque felis. Sed augue lacus viverra vitae congue. Sed risus ultricies tristique nulla. In massa tempor nec feugiat nisl pretium fusce. Non consectetur a erat nam at. Aliquet nec ullamcorper sit amet risus nullam. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Nunc consequat interdum varius sit. Ut lectus arcu bibendum at varius. Facilisis mauris sit amet massa. Eget nulla facilisi etiam dignissim. Orci porta non pulvinar neque laoreet suspendisse interdum. Id ornare arcu odio ut sem nulla pharetra diam sit. Ut enim blandit volutpat maecenas volutpat blandit. Mi in nulla posuere sollicitudin aliquam. Quis blandit turpis cursus in. Eu facilisis sed odio morbi quis commodo odio aenean. Pharetra diam sit amet nisl suscipit adipiscing."
            />
            <InfoBox
              header="Rank Up"
              inverted
              infoText="Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Mauris a diam maecenas sed enim ut sem viverra. In metus vulputate eu scelerisque felis. Sed augue lacus viverra vitae congue. Sed risus ultricies tristique nulla. In massa tempor nec feugiat nisl pretium fusce. Non consectetur a erat nam at. Aliquet nec ullamcorper sit amet risus nullam. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Nunc consequat interdum varius sit. Ut lectus arcu bibendum at varius. Facilisis mauris sit amet massa. Eget nulla facilisi etiam dignissim. Orci porta non pulvinar neque laoreet suspendisse interdum. Id ornare arcu odio ut sem nulla pharetra diam sit. Ut enim blandit volutpat maecenas volutpat blandit. Mi in nulla posuere sollicitudin aliquam. Quis blandit turpis cursus in. Eu facilisis sed odio morbi quis commodo odio aenean. Pharetra diam sit amet nisl suscipit adipiscing."
            />
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}

export default LandingPage