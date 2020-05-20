import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Button, Modal } from 'semantic-ui-react'

import axios from '../../axios'
import ProjectGroup from './components/Projects/Projects'
import { FormBuilder } from '../../utilities/forms/formBuilder'
import { newProjectConfig } from './forms/newProject/config'


class WorkspacePage extends Component {
  constructor(props) {
    super(props);
    this.newProjFormBuilder = new FormBuilder(
      newProjectConfig,
      this.handleFormFieldChange,
      this.queryFormState,
      this.newProjectSubmitHandler
    )
    this.state = {
      projectCount: 0,
      projects: [],
      projFormState: {}
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

  newProjectSubmitHandler = () => {
    const uri = "/api/user/" + this.props.userId + "/workspace/project/new"
    axios.post(
      uri, 
      {...this.state.projFormState}, 
      {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
      .then(res => {
        if (res.data) {
          console.log("set a new project")
          console.log(res.data)
        }
    })
  }

  render() {
    const newProjForm = this.newProjFormBuilder.buildForm()
    const triggerFormButton = (
      <Button 
        fluid
        circular
        size="massive" 
        onClick={() => this.createNewProjectState()}
        style={{
          background: "#53c2aa", 
          border: "solid 2px black", 
          minHeight: "50px", 
          marginTop: "3em", 
          marginBottom: "3em"
        }}
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