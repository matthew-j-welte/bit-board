import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid } from 'semantic-ui-react'
import axios from '../../axios'

import CodePageJumbotron from './CodePageJumbotron/CodePageJumbotron'
import FileExplorer from './FileExplorer/FileExplorer'
import EditorHeader from './EditorHeader/EditorHeader'
import MainEditorPane from './MainEditorPane/MainEditorPane'
import * as styles from './styles'

import { postNewEditorConfiguration, getEditorConfigurations } from './requests'

class CodePage extends Component {
  displayName = "CodePage"
  constructor(props) {
    super(props);
    const defaultLanguage = "Python"
    this.state = {
      activeLanguage: defaultLanguage.language,
      activeIcon: defaultLanguage.logo,
      activeFile: "main.py",
      activeFileContents: "",
      currentCode: {
        "main.py": "",
        "client.py": "",
        "loader.py": ""
      },
      showLangs: false,
      newLangsPulsing: true,
      editorConfiguration: {},
      savedConfigurations: []
    }
  }

  componentDidMount() {
    getEditorConfigurations(this);
  }

  languageSelectHandler = (lang) => {
    this.setState({
      activeLanguage: lang
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

  submitNewEditorConfiguration = (editorConf) => postNewEditorConfiguration(this, editorConf)

  codeInputHandler = (value) => {
    let codeMap = {...this.state.currentCode}
    codeMap[this.state.activeFile] = value
    this.setState({
      activeFileContents: value,
      currentCode: codeMap
    })
  } 

  codeSubmitHandler = () => {
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

  startNewLabelPulsing = () => this.setState({showLangs: true})
  stopNewLabelPulsing = () => this.setState({showLangs: false})
  setEditorConfiguration = (conf) => this.setState({...this.state, editorConfiguration: conf});
  
  setEditorConfigurationFromID = (confID) => {
    let mergedConf = {
      ...this.state.editorConfiguration,
      ...this.state.savedConfigurations.find(
        conf => conf._id === confID
      )
    }
    this.setState({
      editorConfiguration: mergedConf
    })
  }

  render() {
    return (
      <Segment style={{marginTop: "0", padding: "0"}}>
        <CodePageJumbotron 
          newLabelPulsing={this.state.newLangsPulsing}
          startNewLabelPulsing={this.startNewLabelPulsing}
          stopNewLabelPulsing={this.stopNewLabelPulsing}
          languageSelectHandler={this.languageSelectHandler}
          setEditorConfiguration={this.setEditorConfiguration}
          submitNewEditorConfiguration={this.submitNewEditorConfiguration}
          savedEditorConfigurations={this.state.savedConfigurations}
          setEditorConfigurationFromID={this.setEditorConfigurationFromID}
        />
        <Segment basic style={styles.codePageSegmentStyle}>
          <Segment raised style={styles.editorSegmentStyle}>
            <EditorHeader
              language={this.state.activeLanguage}
            />
            <Grid>
              <Grid.Column width={4}>
                <FileExplorer 
                  currentCode={this.state.currentCode}
                  activeFile={this.state.activeFile}
                  fileClickHandler={this.handleFileClick}
                />
              </Grid.Column>
              <Grid.Column width={12} style={styles.editorMiddleColumnStyle}>
                <MainEditorPane 
                  activeFileContents={this.state.activeFileContents}
                  codeInputHandler={this.codeInputHandler}
                  codeSubmitHandler={this.codeSubmitHandler}
                  codeClearHandler={this.codeClearHandler}
                  activeLanguage={this.state.activeLanguage}
                  editorConfiguration={this.state.editorConfiguration}
                />
              </Grid.Column>
            </Grid>
          </Segment>
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