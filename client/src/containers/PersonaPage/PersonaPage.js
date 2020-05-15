import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      personaLvl: 0,
      personaLvlPercent: 67
    }
  }

  setPersonaSkills = () => {
    const uri = "/api/user/" + this.props.userId + "/persona/skills"
    axios.get(uri).then(res => {
      if (res.data) {
        this.setState({
          skills: [...res.data.slice()]
        })
      }
    })
  }

  setPersonaLvl = () => {
    const uri = "/api/user/" + this.props.userId + "/status"
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

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(PersonaPage)