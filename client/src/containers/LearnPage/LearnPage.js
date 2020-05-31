import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Menu, Icon, Segment, Grid, Feed, Item, Modal, Label } from 'semantic-ui-react'

import axios from '../../axios'
import { 
  VideoLearningResourceRow, 
  ReadingLearningResourceRow 
} from './components/LearningResources'
import { 
  vidFormConfig, 
  bookFormConfig, 
  articleFormConfig
} from './forms/newResource/config'
import { FormBuilder } from '../../utilities/forms/formBuilder'
import { 
  generateErrorPageFromAxiosError, 
  generateWarningModalFromAxiosError,
  getErrorInfo
 } from '../../utilities/errorHandling/axiosErrors'
import { sendErrorReport, ErrorReport } from '../../utilities/errorHandling/errorReports'
import ResourceTypeTabs from './ResourceTypeTabs/ResourceTypeTabs'

import ColorCloudBkg from '../../assets/images/color-cloud.png'
import CppBook from '../../assets/images/cpp-book.jpg'

const imageMap = {
  "cpp-book": CppBook,
  "color-cloud": ColorCloudBkg
}

class LearnPage extends Component {
  displayName = "LearnPage"
  constructor(props) {
    super(props);
    const formHandlers = [
      this.handleFormFieldChange,
      this.queryFormState,
      this.newResourceSuggestionSubmitHandler
    ]
    this.vidFormBuilder = new FormBuilder(vidFormConfig, ...formHandlers)
    this.bookFormBuilder = new FormBuilder(bookFormConfig, ...formHandlers)
    this.articleFormBuilder = new FormBuilder(articleFormConfig, ...formHandlers)
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

  menuTabSelectionHandler = (e, { name }) => this.setState({ activeResourceTypeTab: name })

  getResources() {
    const uri = "/api/user/" + this.props.userId + "/learn/resources"
    axios.get(uri)
    .then(res => {
      if (res.data) {
        const returnedResources = [...res.data.slice()]
        const currentResources = {...this.state.resources}
        this.setState({
          resources: {
            videos: [...currentResources.videos, returnedResources.filter(r => r['type'] === "videos")],
            books: [...currentResources.books, returnedResources.filter(r => r['type'] === "books")],
            articles: [...currentResources.articles, returnedResources.filter(r => r['type'] === "articles")]
          }
        })
      }
    })
    .catch(err => {
      this.setState({
        error: generateErrorPageFromAxiosError(err)
      })
      const { message } = getErrorInfo(err)
      const payload = {
        errorFunctionSource: "getResources",
        errorComponentSource: this.displayName, 
        clientSideEffect: "Learning resources are not able to be displayed for this user",
        problemURI: uri
      }
      const report = new ErrorReport(
        this.props.userId,
        message, 
        "Axios Error",
        payload
      )
      sendErrorReport(report)
    })
  }

  renderResourceSkills(skills) {
    return skills.map(skill => (
      <Item.Group>
        <Item>
          <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
          <Item.Content verticalAlign='middle'>
            {skill["name"]}
          </Item.Content>
        </Item>
      </Item.Group>
    ))
  }

  renderResourceFeed(comments) {
    return comments.map(comment => {
      const elapsedTime = (new Date().getTime() / 1000) - comment["datePosted"]
      const dayEstimate = Math.round(elapsedTime / 86400)
      const datePrompt = dayEstimate > 0 ? `Posted ${dayEstimate} day${dayEstimate === 1 ? "" : "s"} ago` : "Posted Today"
      return (
        <Feed.Event
          icon="pencil"
          date={datePrompt}
          summary={comment["content"]}
        />
      )
    })
  }

  renderResourceRow(resource) {
    if (resource["type"] === "videos"){
      return <VideoLearningResourceRow {...resource}/>
    }
    else {
      return <ReadingLearningResourceRow {...resource}/>
    }
  }

  genResources() {
    return this.state.resources[this.state.activeResourceTypeTab]
    .map(resource => {
      return this.renderResourceRow(resource)
    });
  }

  componentDidMount() {
    this.getResources()
  }

  initializeNewResourceFormState = (builder) => {
    this.setState({ 
      newResourceForm: {...builder.createStateModel()}
    })
  }

  handleFormFieldChange = (_, { value }, key) => {
    const formState = {...this.state.newResourceForm}
    formState[key] = value;
    this.setState({
      newResourceForm: formState
    })
  }

  queryFormState = (key) => this.state.newResourceForm[key]

  newResourceSuggestionSubmitHandler = () => {
    const uri = "/api/user/" + this.props.userId + "/learn/resource/new"
    console.log(this.state.newResourceForm)
    axios.post(
      uri, 
      {...this.state.newResourceForm}, 
      {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
    .then(res => {
      if (res.data) {
        console.log("set a new resource suggestion")
        console.log(res.data)
      }
    })
    .catch(err => {
      this.setState({
        warning: generateWarningModalFromAxiosError(err)
      })
    })
  }

  render() {
    if (this.state.error) {
      return this.state.error
    }
    if (this.state.warning) {
      console.log("[[ Future Effort ]] Show modal stating the post failed")
      this.setState({warning: null})
    }

    const { activeResourceTypeTab } = this.state;
    const resourceTypeMenuTabs = (
      <ResourceTypeTabs 
        handleFormFieldChange={this.handleFormFieldChange}
        queryFormState={this.queryFormState}
        newResourceSuggestionSubmitHandler={this.newResourceSuggestionSubmitHandler} 
        initializeNewResourceFormState={this.initializeNewResourceFormState}
        menuTabSelectionHandler={this.menuTabSelectionHandler}
        activeResourceTypeTab={activeResourceTypeTab}
      />
    )

    return (
      <Segment basic style={{minHeight: "1200px"}}>
        <Segment style={{margin: "2em 10em 1em 10em"}}>
          {menuBar}
        </Segment>
        <Segment style={{minHeight: "1200px", margin: "2em 10em 5em 10em"}}>
          <Grid stretched columns='equal'>
            {this.genResources()}
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