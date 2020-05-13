import React, { Component } from 'react'

import { 
  Grid,
  Segment,
  Image
} from 'semantic-ui-react'

import axios from '../../axios'
import SkillBar from './components/SkillBar'
import PersonaLevelBox from './components/PersonaLevelBox'

import DummyModel from '../../assets/images/dummy-model.png'

class PersonaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      userId: "1828dec38879419fad0ce23fe1323fa4",
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

  render() {
    return (
      <Segment>
        <Grid style={{margin: "5em 20em 0em 20em"}} columns='equal'>
          <SkillBar
            icon="code"
            header="Software Acumen"
            skills={this.state.skills.filter(skill => (skill.category === 'Software'))}
          />
          <Grid.Column width={7}>
            <Segment inverted style={{minHeight: "700px"}}>
              <Image style={{background: "#faf9dc", minHeight: "670px"}} src={DummyModel}/>
            </Segment>
          </Grid.Column>
          <SkillBar
            icon="book"
            header="Miscellaneous Skills"
            skills={this.state.skills.filter(skill => (skill.category === 'Soft Skills'))}
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