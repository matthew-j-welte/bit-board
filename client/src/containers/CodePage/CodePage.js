import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid } from 'semantic-ui-react'
import axios from '../../axios'

import CodePageJumbotron from './CodePageJumbotron/CodePageJumbotron'
import LanguageExplorer from './LanguageExplorer/LanguageExplorer'
import FileExplorer from './FileExplorer/FileExplorer'
import EditorHeader from './EditorHeader/EditorHeader'
import MainEditorPane from './MainEditorPane/MainEditorPane'
import { 
  codePageSegmentStyle, 
  editorSegmentStyle, 
  editorMiddleColumnStyle } from './styles'
import { languageChoices } from './LanguageExplorer/constants'


class CodePage extends Component {
  constructor(props) {
    super(props);
    const defaultLanguage = languageChoices[0]
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
      editorConfiguration: {}
    }
    setInterval(() => {
      if (this.state.showLangs) {
        this.setState({newLangsPulsing: !this.state.newLangsPulsing})
      }
    }, 2250)
  }

  languageSelectHandler = (e, { name }) => {
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

  codeInputHandler = (value) => {
    let codeMap = {...this.state.currentCode}
    codeMap[this.state.activeFile] = value
    this.setState({
      activeFileContents: value,
      currentCode: codeMap
    })
  } 
  
  codeClearHandler = () => {
    let clearedCode = {}
    Object.keys({...this.state.currentCode}).forEach(filename => clearedCode[filename] = "")
    this.setState({
      currentCode: clearedCode,
      activeFileContents: ""
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

  setEditorConfiguration = (conf) => this.setState({...this.state, editorConfiguration: conf})

  render() {
    return (
      <Segment style={{marginTop: "0", padding: "0"}}>
        <CodePageJumbotron 
          newLabelPulsing={this.state.newLangsPulsing}
          startNewLabelPulsing={this.startNewLabelPulsing}
          stopNewLabelPulsing={this.stopNewLabelPulsing}
          languageSelectHandler={this.languageSelectHandler}
          setEditorConfiguration={this.setEditorConfiguration}
        />
        <Segment basic style={codePageSegmentStyle}>
          <Segment raised style={editorSegmentStyle}>
            <EditorHeader
              icon={this.state.activeIcon}
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
              <Grid.Column width={12} style={editorMiddleColumnStyle}>
                <MainEditorPane 
                  activeFileContents={this.state.activeFileContents}
                  codeInputHandler={this.codeInputHandler}
                  codeSubmitHandler={this.codeSubmitHandler}
                  codeClearHandler={this.codeClearHandler}
                  activeLanguage={this.state.activeLanguage}
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