import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import ResourceTypeTabs from './ResourceTypeTabs/ResourceTypeTabs'
import LearningResources from './LearningResources/LearningResources'
import { requiredFieldsFromConfig } from '../../utilities/forms/formBuilder'
import { vidFormConfig } from './ResourceTypeTabs/forms/newResource/config'

import * as requests from './requests'
import * as styles from './styles'

class LearnPage extends Component {
  displayName = "LearnPage"
  constructor(props) {
    super(props);
    this.state = {
      activeResourceTypeTab: "videos",
      resources: {
        videos: [],
        books: [],
        articles: []
      },
      newResourceForm: {},
      handledFields: {},
      requiredFormFields: requiredFieldsFromConfig(vidFormConfig),
      error: null,
      warning: null,
      awaitingPost: null,
      successfulPosting: null,
      failedPosting: null,
      submissionConfirmationModalOpen: false,
      fieldsSatisfied: false,
      formSatisfied: false
    }
  }

  componentDidMount() {
    requests.getResources(this)
  }

  submissionConfirmationModalStateChange = () => {
    this.setState({
      submissionConfirmationModalOpen: !this.state.submissionConfirmationModalOpen
    })
  }

  menuTabSelectionHandler = (name) => {
    this.setState({ activeResourceTypeTab: name })
  } 

  handleFormFieldChange = (_, { value }, key) => {
    const formState = {...this.state.newResourceForm}
    const handledFieldState = {...this.state.handledFields}
    formState[key] = value;
    if (value) {
      handledFieldState[key] = true
    }
    else {
      handledFieldState[key] = false
    }
    this.setState({
      newResourceForm: formState,
      handledFields: handledFieldState,
      formSatisfied: this.state.requiredFormFields.every(field => handledFieldState[field] === true)
    })
  }

  isFormSatisfied = (requiredFields) => {
    const handledFields = {...this.state.handledFields}
    this.setState({
      formSatisfied: requiredFields.every(field => handledFields[field] === true)
    })
  }

  initializeNewResourceFormState = (builder) => {
    this.setState({ 
      newResourceForm: {...builder.createStateModel()},
      handledFields: {...builder.createStateModel()}
    })
  }

  queryFormState = (key) => this.state.newResourceForm[key]

  render() {
    if (this.state.error) {
      return this.state.error
    }
    if (this.state.warning) {
      console.log("[[ Future Effort ]] Show modal stating the post failed")
      this.setState({warning: null})
    }

    const { activeResourceTypeTab } = this.state;
    return (
      <Segment basic style={styles.resourceTabsSegment}>
        <Segment style={styles.resourceTabsInnerSegment}>
          <ResourceTypeTabs 
            handleFormFieldChange={this.handleFormFieldChange}
            queryFormState={this.queryFormState}
            newResourceSuggestionSubmitHandler={() => requests.postResourceSuggestion(this)}
            initializeNewResourceFormState={this.initializeNewResourceFormState}
            menuTabSelectionHandler={this.menuTabSelectionHandler}
            activeResourceTypeTab={activeResourceTypeTab}
            awaitingPost={this.state.awaitingPost}
            successfulPosting={this.state.successfulPosting}
            failedPosting={this.state.failedPosting}
            submissionConfirmationModalStateChange={this.submissionConfirmationModalStateChange}
            submissionConfirmationModalOpen={this.state.submissionConfirmationModalOpen}
            formSatisfied={this.state.formSatisfied}
          />
        </Segment>
        <Segment style={styles.resourcesSegment}>
            <LearningResources
              resources={{...this.state.resources}}
              activeResourceTypeTab={activeResourceTypeTab}
              userId={this.props.userId}
            />
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

export default connect(mapStateToProps)(LearnPage)