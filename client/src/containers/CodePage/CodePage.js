import React, { Component } from 'react'
import { connect } from 'react-redux'

import { List, Segment, Image, Grid, Button, Form, Header, Divider } from 'semantic-ui-react'

import axios from '../../axios'

import PythonLogo from '../../assets/images/python-logo.png'
import GoLogo from '../../assets/images/golang-logo.png'
import JSLogo from '../../assets/images/javascript-logo.png'

const languageChoices = [
  {language: "Python", logo: PythonLogo},
  {language: "Go", logo: GoLogo},
  {language: "Javascript", logo: JSLogo}
]

const LanguageChoice = (props) => (
  <List.Item 
    name={props.language} 
    active={props.isItemActive} 
    onClick={props.clickHandler}
  >
    <Image avatar src={props.logo}/>
    <List.Content>
      <List.Header>{props.language}</List.Header>
    </List.Content>
  </List.Item>
)

const FileChoice = (props) => (
  <List.Item 
    key={props.filename}
    name={props.filename} 
    active={props.isItemActive} 
    onClick={props.clickHandler}
  >
    <List.Icon name='file' />
    <List.Content>
      <List.Header>{props.filename}</List.Header>
    </List.Content>
  </List.Item>
)

class CodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: "Python",
      activeIcon: PythonLogo,
      activeFile: "main.py",
      activeFileContents: "",
      currentCode: {
        "main.py": "",
        "client.py": "",
        "loader.py": ""
      }
    }
  }

  handleLanguageClick = (e, { name }) => {
    this.setState({
      activeLanguage: name,
      activeIcon: languageChoices.find(({ language }) => language === name).logo
    })
  }
  
  handleFileClick = (e, { name }) => {
    this.setState({
      activeFile: name,
      activeFileContents: this.state.currentCode[name]
    })
  }

  retrieveCode = (e, { name }) => {
    return this.state.currentCode.find(({ filename }) => filename === name).con
  }

  activeLangHandler = (lang) => this.state.activeLanguage === lang ? true : false 
  
  activeFileHandler = (filename) => this.state.activeFile === filename ? true : false 

  codeInput = (e, { value }) => {
    let codeMap = {...this.state.currentCode}
    codeMap[this.state.activeFile] = value
    this.setState({
      activeFileContents: value,
      currentCode: codeMap
    })
  } 
  
  clearCode = () => {
    let clearedCode = {}
    Object.keys({...this.state.currentCode}).forEach(filename => clearedCode[filename] = "")
    this.setState({
      currentCode: clearedCode,
      activeFileContents: ""
    })
  }

  submitCode = () => {
    const uri = "/api/user/" + this.props.userId + "/code/submit/" + this.state.activeLanguage
    axios.post(
      uri, 
      {"id": this.props.userId, "code": this.state.currentCode}, 
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }).then(res => {
        if (res.data) {
          console.log(res.data)
        }
    })
  }

  render() {
    const languages = languageChoices.map(lang => (
      <LanguageChoice 
        isItemActive={this.activeLangHandler(lang.language)}
        clickHandler={this.handleLanguageClick}
        {...lang}
      />
    ))

    const files = Object.keys(this.state.currentCode).map(file => (
      <FileChoice
        isItemActive={this.activeFileHandler(file)}
        clickHandler={this.handleFileClick}
        filename={file}
      />
    ))

    return (
      <Segment basic style={{minHeight: "1200px", marginTop: "3em"}}>
        <Segment raised inverted style={{minHeight: "600px", margin: "3em 6em 0em 6em"}}>
          <Header style={{marginBottom: "0em"}} as='h2'>
            <Image 
              circular 
              src={this.state.activeIcon}
              style={{width: "2em", height: "2em"}}
            />
              {this.state.activeLanguage}
          </Header>
          <Divider inverted style={{marginTop: ".25em"}}/>
          <Grid>
            <Grid.Column width={3}>
              <List inverted selection verticalAlign='middle' size="small">
                {files}
              </List>
            </Grid.Column>
            <Grid.Column width={10} style={{paddingRight: "0em", paddingLeft: "0em"}}>
              <Form>
                <Form.TextArea 
                  onChange={this.codeInput}
                  value={this.state.activeFileContents}
                  style={{
                    fontSize: "1.3em",
                    background: "#cbf0f7", 
                    width: "100%", 
                    minHeight: "550px", 
                    maxHeight: "850px", 
                    overflow: "auto"
                  }}
                />
                <Button.Group attached='bottom'>
                  <Button primary onClick={this.submitCode}>SUBMIT</Button>
                  <Button.Or/>
                  <Button onClick={this.clearCode}>CLEAR ALL</Button>
                </Button.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={3}>
              <List inverted selection verticalAlign='middle' size="huge">
                {languages}
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(CodePage)