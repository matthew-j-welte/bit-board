import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container } from 'semantic-ui-react'

import axios from '../../axios'
import ProjectGroup from './components/Projects/Projects'

class WorkspacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCount: 0,
      projects: []
    }
  }

  getProjects = () => {
    const uri = "/api/user/" + this.props.userId + "/workspace/projects"
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
          projects={this.state.projects.filter(project => project.type === 'Code')}
        />
        <ProjectGroup
          title="Writing Projects"
          subheader="Review your Writing"
          icon="pencil"
          projects={this.state.projects.filter(project => project.type === 'Writing')}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(WorkspacePage)