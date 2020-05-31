import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Segment, Image } from 'semantic-ui-react'

import SkillBar from './SkillBar/SkillBar'
import PersonaLevelBox from './PersonaLevelBox/PersonaLevelBox'
import DummyModel from '../../assets/images/dummy-model.png'
import * as requests from './requests'

class PersonaPage extends Component {
  displayName = "PersonaPage"
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      personaLvl: 0,
      personaLvlPercent: 67,
      error: null,
      warning: null
    }
  }

  componentDidMount() {
    requests.getPersonaSkills(this)
    // requests.gettPersonaLvl(this)
  }

  render() {
    if (this.state.error) {
      return this.state.error
    }
    if (this.state.warning) {
      console.log("[[ Future Effort ]] Show modal stating the post failed")
      this.setState({warning: null})
    }

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