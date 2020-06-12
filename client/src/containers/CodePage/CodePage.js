import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Divider, Card, Reveal, Image, Icon, List, Table, Label, Transition } from 'semantic-ui-react'
import axios from '../../axios'

import LanguageExplorer from './LanguageExplorer/LanguageExplorer'
import FileExplorer from './FileExplorer/FileExplorer'
import EditorHeader from './EditorHeader/EditorHeader'
import MainEditorPane from './MainEditorPane/MainEditorPane'
import { 
  codePageSegmentStyle, 
  editorSegmentStyle, 
  editorMiddleColumnStyle } from './styles'
import { languageChoices } from './LanguageExplorer/constants'

import pylogo from '../../assets/images/python-logo.jpg'
import gologo from '../../assets/images/golang-logo.png'
import jslogo from '../../assets/images/javascript-logo.png'
import csharplogo from '../../assets/images/csharp-logo.png'
import cpplogo from '../../assets/images/cpp-logo.jpg'
import javalogo from '../../assets/images/java-logo.jpg'
import rubylogo from '../../assets/images/ruby-logo.png'
import mysqllogo from '../../assets/images/mysql-logo.jpeg'
import cslogo from '../../assets/images/coffeescript-logo.svg'

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
      newLangsPulsing: true
    }
    setInterval(() => {this.setState({newLangsPulsing: !this.state.newLangsPulsing})}, 3000)
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


  render() {
    const cardies = [{
      title: "SELECT A LANGUAGE",
      desc: "BitBoard currently supports a number of coding languages, each with their own set of unique challenges - ranging from basic problem solving to more advanced architectural based projects",
      handler: () => {this.setState({showLangs: !this.state.showLangs})}
    },
    {
      title: "CUSTOMIZE YOUR EDITOR",
      desc: "Customize your editor just like you would on your desktop - ranging from different themes, fontsize, editor size etc.",
      handler: () => {}
    },
    {
      title: "KEYBOARD SHORTCUTS",
      desc: "The goal with our editor is for you to NEVER have to touch your mouse - we have a number of simple but extremely useful keyboard bindings to help achieve this",
      handler: () => {}
    }
    ].map(cardinfo => (
      <Card onClick={cardinfo.handler} style={{borderRadius: "2em"}}>
        <Card.Content textAlign="center">
          <Header size="small" style={{marginTop: "1px"}}>{cardinfo.title}</Header>
          <Divider/>
          <Card.Meta>{cardinfo.desc}</Card.Meta>
        </Card.Content>
      </Card>
    ))

    const cards = (
      <Card.Group style={{margin: "2em"}} itemsPerRow={3}>
        {cardies}
      </Card.Group>
    );

    const statSections = [{
      lvl: "Beginner",
      desc: "For those new to the language",
      done: 5,
      total: 28
    },
    {
      lvl: "Moderate",
      desc: "Fair amount of experience recommended",
      done: 3,
      total: 21
    },
    {
      lvl: "Advanced",
      desc: "Near black belt in this language",
      done: 0,
      total: 13
    },
    {
      lvl: "Architect",
      desc: "Proffessional developer in this language",
      done: 1,
      total: 4
    }
    ].map(statSec => (
        <Header textAlign="center" as='h5' floated="left" style={{fontFamily: 'Righteous', marginLeft: "1em", marginTop: "1em"}}>
          {/* <Icon name='settings' /> */}
          <Header.Content>
            {statSec.lvl}
            <Header.Subheader>{statSec.done}/{statSec.total} Completed</Header.Subheader>
          </Header.Content>
        </Header>
    ))

    const bordRad = {"borderRadius": "3em"}
    const languages = [
      {
        lang: "Python",
        color: "violet",
        logo: pylogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "Golang",
        color: "teal",
        logo: gologo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "JavaScript",
        color: "yellow",
        logo: jslogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "C#",
        color: "blue",
        logo: csharplogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "C++",
        color: "orange",
        logo: cpplogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "Java",
        color: "red",
        logo: javalogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "Ruby",
        color: "pink",
        logo: rubylogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "MySQL",
        color: "orange",
        logo: mysqllogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3
      },
      {
        lang: "Coffee Script",
        color: "brown",
        logo: cslogo,
        beg: 20,
        mod: 10,
        adv: 15,
        arch: 3,
        new: true
      }
    ].map(langinfo => {
      let newLabel = null
      let imgStyle ={
        background: "white", 
        minHeight: "225px", 
        maxHeight: "225px", 
        ...bordRad
      }
      if (langinfo.new) {
        newLabel = (
          <Transition animation="tada" visible={this.state.newLangsPulsing} duration="2000">
            <Label circular color='yellow' size="huge" floating content="NEW!" style={{"box-shadow": "0 0 20px 5px #d6af13"}}/>
          </Transition>
        )
      }

      return (
        <Card style={{minHeight: "225px", ...bordRad}} onClick={() => {}}>
          <Reveal instant animated='fade'>
            <Reveal.Content visible>
              <Image 
                fluid
                src={langinfo.logo}  
                style={imgStyle}
              />
              {newLabel}
            </Reveal.Content>
            <Reveal.Content hidden>
              <Header textAlign="center" block color={langinfo.color} as="h3" style={{padding : "1em", fontFamily: 'Righteous', borderRadius: "2.5em 2.5em 0 0", marginBottom: "1em"}}>{langinfo.lang}</Header>
              {statSections}
            </Reveal.Content>
          </Reveal>
        </Card>
      )
    }) 

    const langGroup = (
      <Segment style={{margin: "3em", padding: "2em", borderRadius: "3em"}}>
        <Card.Group itemsPerRow={5}>
          {languages}
        </Card.Group>
      </Segment>
    )



    return (
      <Segment style={{marginTop: "0", padding: "0"}}>
        <Segment style={{background: "#f2f3f5", margin: "6em 15em 3em 15em"}}>
          <Header 
            textAlign="center" 
            color="blue"
            style={{
              fontSize: "5em", 
              fontFamily: 'Righteous',
              marginTop: ".2em",
              "text-shadow": "0 0 12px grey"
            }}
            >
              WELCOME TO BITBOARD CODE EDITOR
            </Header>
          <Divider/>
          {cards}
          {this.state.showLangs ? langGroup : null}
        </Segment>
        <Segment basic style={codePageSegmentStyle}>
          <Segment raised style={editorSegmentStyle}>
            <EditorHeader
              icon={this.state.activeIcon}
              language={this.state.activeLanguage}
            />
            <Grid>
              <Grid.Column width={3}>
                <FileExplorer 
                  currentCode={this.state.currentCode}
                  activeFile={this.state.activeFile}
                  fileClickHandler={this.handleFileClick}
                />
              </Grid.Column>
              <Grid.Column width={10} style={editorMiddleColumnStyle}>
                <MainEditorPane 
                  activeFileContents={this.state.activeFileContents}
                  codeInputHandler={this.codeInputHandler}
                  codeSubmitHandler={this.codeSubmitHandler}
                  codeClearHandler={this.codeClearHandler}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <LanguageExplorer 
                  activeLanguage={this.state.activeLanguage}
                  languageSelectHandler={this.languageSelectHandler}
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