import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Image, Segment, Button } from 'semantic-ui-react'
import axios from "../../axios";

import InfoBox from '../../components/InfoBox/InfoBox'
import LoginForm from './forms/LoginForm/LoginForm'
import SignUpPrompt from './SignupPrompt/SignUpPrompt'
import BitBoardLogo from '../../assets/images/BitBoard.png'
import UserCountHeader from './UserCountHeader/UserCountHeader'
import { signupFormConfig } from './forms/SignupForm/config'
import { FormBuilder } from '../../utilities/forms/formBuilder'
import { 
  landingPageStyle, 
  topInfoBoxStyle, 
  infoBoxStyle 
} from './styles'


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.newUserFormBuilder = new FormBuilder(
      signupFormConfig,
      this.handleFormFieldChange,
      this.queryFormState,
      <Button content="Submit" onClick={this.newUserSubmitHandler}/>
    );
    this.state = {
      userCount: 0,
      signupFormState: {},
      loginFormState: {
        username: "",
        password: ""
      }
    }
  }

  loginHandler = () => {
    const uri = "/api/user/login"
    axios.post(
      uri, 
      {...this.state.loginFormState}, 
      {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
      .then(res => {
        if (res.data) {
          console.log("[LOGGED IN]")
          this.props.onLogin(res.data)
        }
    });
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
          this.props.onLogin(res.data)
        }
    })
  }

  handleLoginFormFieldChange = (event, { value }, key) => {
    const formState = {...this.state.loginFormState}
    formState[key] = value;
    this.setState({
      loginFormState: formState
    })
  }

  render() {
    const signupForm = this.newUserFormBuilder.buildForm()
    const signupTriggerButton = (
      <Button 
        content="Sign Up"
        color="black" 
        onClick={() => this.createNewUserState()}
        style={{margin: "0px 0px 0px 5px"}}
      />
    )
    const signUpSection = (
      <SignUpPrompt
        trigger={signupTriggerButton} signUpForm={signupForm}/>
    )
    return (
      <Segment
        vertical  
        inverted
        textAlign='center'
        style={landingPageStyle}
      >
        <Container>
          <Image centered size="massive" style={{padding: "6em 1em 6em 1em"}} src={BitBoardLogo}/>
          <UserCountHeader userCount={this.state.userCount}/>
          <LoginForm 
            handler={this.loginHandler}
            onChangeHandler={this.handleLoginFormFieldChange}
            signUpCopmonent={signUpSection}
          />
        </Container>
        <InfoBox
          inverted
          header="Explore"
          infoText="Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Mauris a diam maecenas sed enim ut sem viverra. In metus vulputate eu scelerisque felis. Sed augue lacus viverra vitae congue. Sed risus ultricies tristique nulla. In massa tempor nec feugiat nisl pretium fusce. Non consectetur a erat nam at. Aliquet nec ullamcorper sit amet risus nullam. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Nunc consequat interdum varius sit. Ut lectus arcu bibendum at varius. Facilisis mauris sit amet massa. Eget nulla facilisi etiam dignissim. Orci porta non pulvinar neque laoreet suspendisse interdum. Id ornare arcu odio ut sem nulla pharetra diam sit. Ut enim blandit volutpat maecenas volutpat blandit. Mi in nulla posuere sollicitudin aliquam. Quis blandit turpis cursus in. Eu facilisis sed odio morbi quis commodo odio aenean. Pharetra diam sit amet nisl suscipit adipiscing."
          style={topInfoBoxStyle}
        />
        <InfoBox
          inverted
          header="Rank Up"
          infoText="Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Mauris a diam maecenas sed enim ut sem viverra. In metus vulputate eu scelerisque felis. Sed augue lacus viverra vitae congue. Sed risus ultricies tristique nulla. In massa tempor nec feugiat nisl pretium fusce. Non consectetur a erat nam at. Aliquet nec ullamcorper sit amet risus nullam. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Nunc consequat interdum varius sit. Ut lectus arcu bibendum at varius. Facilisis mauris sit amet massa. Eget nulla facilisi etiam dignissim. Orci porta non pulvinar neque laoreet suspendisse interdum. Id ornare arcu odio ut sem nulla pharetra diam sit. Ut enim blandit volutpat maecenas volutpat blandit. Mi in nulla posuere sollicitudin aliquam. Quis blandit turpis cursus in. Eu facilisis sed odio morbi quis commodo odio aenean. Pharetra diam sit amet nisl suscipit adipiscing."
          style={infoBoxStyle}
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