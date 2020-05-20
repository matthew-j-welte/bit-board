import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Container,
  Header,
  Image,
  Segment,
  Button
} from 'semantic-ui-react'

import InfoBox from '../../components/InfoBox/InfoBox'
import LoginForm from './forms/LoginForm/LoginForm'
import SignUpPrompt from './components/signUpPrompt'
import { signupFormConfig } from './forms/SignupForm/config'
import { FormBuilder } from '../../utilities/forms/formBuilder'

import BitBoardLogo from '../../assets/images/BitBoard.png'

import axios from "../../axios";


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.newUserFormBuilder = new FormBuilder(
      signupFormConfig,
      this.handleFormFieldChange,
      this.queryFormState,
      this.newUserSubmitHandler
    );
    this.state = {
      userCount: 0,
      signupFormState: {}
    }
  }

  login = (username) => {
    axios.get("/api/user/" + username).then(res => {
      if (res.data) {
        this.props.onLogin(res.data)
      }
    });
  };

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

  createNewUserState = () => {
    this.setState({ 
      signupFormState: {...this.newUserFormBuilder.createStateModel()}
    })
  }

  handleFormFieldChange = (_, { value }, key) => {
    const formState = {...this.state.signupFormState}
    formState[key] = value;
    this.setState({
      signupFormState: formState
    })
  }

  queryFormState = (key) => this.state.signupFormState[key]

  newUserSubmitHandler = () => {
    const uri = "/api/user/new"
    axios.post(
      uri, 
      {...this.state.signupFormState}, 
      {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
      .then(res => {
        if (res.data) {
          console.log("set user id in redux here")
          console.log(res.data)
        }
    })
  }

  render() {
    const signupForm = this.newUserFormBuilder.buildForm()
    const signupTriggerButton = (
      <Button 
        content="Sign Up"
        color="black" 
        style={{margin: "0px 0px 0px 5px"}}
        onClick={() => this.createNewUserState()}
      />
    )
    const signUpSection = (
      <SignUpPrompt 
        trigger={signupTriggerButton} signUpForm={signupForm}/>
    )

    return (
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 1500, padding: '0em 0em 6em 0em' }}
        vertical
      >
        <Container>
          <Image centered size="massive" style={{padding: "6em 1em 6em 1em"}} src={BitBoardLogo}/>
          <Header
            as='h3'
            content={"Over " + this.state.userCount + " users and counting!"}
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'bold',
              marginTop: '0em',
            }}
          />
          <LoginForm 
            handler={this.login} 
            signUpCopmonent={signUpSection}/>
        </Container>
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
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userId) => dispatch({type: "USER_LOGIN", userId: userId})
  }
}

export default connect(null, mapDispatchToProps)(LandingPage)