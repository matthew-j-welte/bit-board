import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid } from 'semantic-ui-react'

import ResourceTypeTabs from './ResourceTypeTabs/ResourceTypeTabs'
import LearningResources from './LearningResources/LearningResources'
import * as requests from './requests'

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
      error: null,
      warning: null
    }
  }

  componentDidMount() {
    requests.getResources(this)
  }

  menuTabSelectionHandler = (name) => {
    this.setState({ activeResourceTypeTab: name })
  } 

  handleFormFieldChange = (_, { value }, key) => {
    const formState = {...this.state.newResourceForm}
    formState[key] = value;
    this.setState({
      newResourceForm: formState
    })
  }

  initializeNewResourceFormState = (builder) => {
    this.setState({ 
      newResourceForm: {...builder.createStateModel()}
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
      <Segment basic style={{minHeight: "1200px"}}>
        <Segment style={{margin: "2em 10em 1em 10em"}}>
          <ResourceTypeTabs 
            handleFormFieldChange={this.handleFormFieldChange}
            queryFormState={this.queryFormState}
            newResourceSuggestionSubmitHandler={() => requests.postResourceSuggestion(this)}
            initializeNewResourceFormState={this.initializeNewResourceFormState}
            menuTabSelectionHandler={this.menuTabSelectionHandler}
            activeResourceTypeTab={activeResourceTypeTab}
          />
        </Segment>
        <Segment style={{minHeight: "1200px", margin: "2em 10em 5em 10em"}}>
          <Grid stretched columns='equal'>
            <LearningResources
              resources={{...this.state.resources}}
              activeResourceTypeTab={activeResourceTypeTab}
            />
          </Grid>
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