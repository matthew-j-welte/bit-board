import React, { Component } from 'react'

import { 
  Grid,
  Segment,
  Header,
  Icon,
  Image,
  Progress,
  Divider,
  Container
} from 'semantic-ui-react'

import axios from '../../axios'

import DummyModel from '../../assets/images/dummy-model.png'

const skillTypeToColor = {
  Software: {
    0: "blue",
    1: "teal"
  },
  Soft: {
    0: "violet",
    1: "purple"
  }
}

const SkillBar = (props) => (
  <Grid.Column>
    <Segment inverted style={{minHeight: "700px"}}>
      <Header as='h2' icon textAlign='center'>
        <Icon name={props.icon} circular />
        <Header.Content>{props.header}</Header.Content>
      </Header>
      <Divider/>
      {props.skillComponents}
    </Segment>
  </Grid.Column>
)

const PersonaLevelBox = (props) => (
  <Segment textAlign="center" inverted style={{margin: "0em 21em 0em 21em"}}>
    <Header style={{marginTop: "0em", paddingTop: "0em"}} as='h2' icon textAlign='center'>
      <Icon name='star' inverted/>
      <Header.Content>PERSONA LEVEL</Header.Content>
    </Header>
    <Progress size="big" percent={props.percent} active inverted color="blue" progress>
      Current Lvl: {props.lvl}
    </Progress>
  </Segment>
)

class PersonaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      userId: "100",
      personaLvl: 0,
      personaLvlPercent: 67
    }
  }

  setPersonaSkills = () => {
    const uri = "/api/user/" + this.state.userId + "/persona/skills"
    axios.get(uri).then(res => {
      if (res.data) {
        this.setState({
          skills: [...res.data.slice()]
        })
      }
      console.log(this.state.skills)
    })
  }

  setPersonaLvl = () => {
    const uri = "/api/user/" + this.state.userId + "/status"
    axios.get(uri).then(res => {
      if (res.data) {
        this.setState({
          personaLvl: res.data["personaLvl"]
        })
      }
    })
  }

  componentDidMount() {
    this.setPersonaSkills()
    this.setPersonaLvl()
  }

  getSkillColorShade(percent, cat) {
    const shades = skillTypeToColor[cat]
    if (percent < 50) {
      return [shades[0], false]
    }
    return [shades[1], true]
  }

  render() {
    let softSkills = []
    let softwareSkills = []
    this.state.skills.forEach((skill) => {
      let shade, _active
      [shade, _active] = this.getSkillColorShade(skill.percent, skill.category)
      
      const extraProps = []
      if (_active) {
        extraProps.push("active")
      }
      const progress = (
        <Container>
          <Divider/>
          <Progress 
            active={_active}
            style={{marginTop: "2em"}} 
            percent={skill.percent} 
            inverted 
            color={shade} 
            progress
          >
            {skill.name}
          </Progress>
        </Container>
      )
      if (skill.category == "Software") {
        softwareSkills.push(progress)
      }
      else {
        softSkills.push(progress)
      }
    });

    return (
      <Segment>
        <Grid style={{margin: "5em 20em 0em 20em"}} columns='equal'>
          <SkillBar
            icon="code"
            header="Software Acumen"
            skillComponents={softwareSkills}
          />
          <Grid.Column width={7}>
            <Segment inverted style={{minHeight: "700px"}}>
              <Image style={{background: "#faf9dc", minHeight: "670px"}} src={DummyModel}/>
            </Segment>
          </Grid.Column>
          <SkillBar
            icon="book"
            header="Miscellaneous Skills"
            skillComponents={softSkills}
          />
        </Grid>
        <PersonaLevelBox
          percent={this.state.personaLvlPercent}
          lvl={this.state.personaLvl}
        />
      </Segment>
    )
  }
}

export default PersonaPage