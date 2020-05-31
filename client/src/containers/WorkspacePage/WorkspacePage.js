import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Modal } from 'semantic-ui-react'

import ProjectGroup from './Projects/Projects'
import { FormBuilder } from '../../utilities/forms/formBuilder'
import { newProjectConfig } from './forms/newProject/config'
import * as requests from './requests'
import * as styles from './styles'


class WorkspacePage extends Component {
  displayName = 'WorkspacePage';
  constructor(props) {
    super(props);
    this.newProjFormBuilder = new FormBuilder(
      newProjectConfig,
      this.handleFormFieldChange,
      this.queryFormState,
      () => requests.postNewProject(this)
    )
    this.state = {
      projectCount: 0,
      projects: [],
      projFormState: {},
      warning: null,
      error: null
    }
  }

  componentDidMount() {
    requests.getProjects(this);
  }

  createNewProjectState = () => {
    this.setState({ 
      projFormState: {...this.newProjFormBuilder.createStateModel()}
    })
  }

  handleFormFieldChange = (_, { value }, key) => {
    const formState = {...this.state.projFormState}
    formState[key] = value;
    this.setState({
      projFormState: formState
    })
  }

  queryFormState = (key) => this.state.projFormState[key]

  render() {
    if (this.state.error) {
      return this.state.error
    }
    
    if (this.state.warning) {
      console.log("[[ Future Effort ]] Show modal stating the post failed")
      this.setState({warning: null})
    }

    const newProjForm = this.newProjFormBuilder.buildForm()
    const triggerFormButton = (
      <Button 
        fluid
        circular
        size="massive" 
        onClick={() => this.createNewProjectState()}
        style={styles.newProjectSubmitButton}
      >
        Create New Project
      </Button>
    )
    const newProjPrompt = (
      <Modal trigger={triggerFormButton}>
        <Modal.Header>Create New Project</Modal.Header>
        <Modal.Content>
          {newProjForm}
        </Modal.Content>
      </Modal>
    )

    return (
      <Container style={{marginTop: "5em"}} >
        {newProjPrompt}
        <ProjectGroup
          title="Software Development Projects"
          subheader="Manage your Code"
          icon="code branch"
          projects={this.state.projects.filter(project => project.type === 'software')}
        />
        <ProjectGroup
          title="Writing Projects"
          subheader="Review your Writing"
          icon="pencil"
          projects={this.state.projects.filter(project => project.type === 'writing')}
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