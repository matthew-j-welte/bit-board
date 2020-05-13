import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import axios from '../../axios'

class WorkspacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "1828dec38879419fad0ce23fe1323fa4",
      projectCount: 0,
      projects: []
    }
  }

  getProjects = () => {
    const uri = "/api/user/" + this.state.userId + "/workspace/projects"
    axios.get(uri).then(res => {
      if (res.data) {
        this.setState({
          projects: [...res.data.slice()]
        })
      }
    })

  }

  componentDidMount() {
    this.getProjects();
  }

  render() {  
    return (
      <Container style={{marginTop: "5em"}} >
        <ProjectGroup
          title="Software Development Projects"
          subheader="Manage your Code"
          icon="code branch"
          cards={this.state.projects.filter(project => (project.type === 'Code'))}
        />
        <ProjectGroup
          title="Writing Projects"
          subheader="Review your Writing"
          icon="pencil"
          cards={this.state.projects.filter(project => (project.type === 'Writing'))}
        />
      </Container>
    )
  }
}

export default WorkspacePage