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

import ColorCloudBkg from '../../assets/images/color-cloud.png'
import CppBook from '../../assets/images/cpp-book.jpg'

const imageMap = {
  "cpp-book": CppBook,
  "color-cloud": ColorCloudBkg
}

class LearnPage extends Component {
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
      activeItem: "videos",
      resources: [],
      newResourceForm: {}
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getResources() {
    const uri = "/api/user/" + this.props.userId + "/learn/resources"
    axios.get(uri).then(res => {
      if (res.data) {
        this.setState({
          resources: [...res.data.slice()]
        })
      }
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
      return (
        <VideoLearningResourceRow
          videoId={resource["videoId"]}
          placeholderImage={imageMap[resource["placeholder"]]}
          videoSource="youtube"
          author={resource["author"]}
          title={resource["title"]}
          description={resource["description"]}
          userCount={resource["viewers"]}
          comments={this.renderResourceFeed(resource["comments"])}
          associatedSkills={this.renderResourceSkills(resource["skills"])}
        />
      )
    }
    else {
      return (
        <ReadingLearningResourceRow
          image={imageMap[resource["image"]]}
          author={resource["author"]}
          title={resource["title"]}
          description={resource["description"]}
          userCount={resource["viewers"]}
          comments={this.renderResourceFeed(resource["comments"])}
          associatedSkills={this.renderResourceSkills(resource["skills"])}
        />
      )
    }
  }

  genResources() {
    return this.state.resources
    .filter(resource => resource["type"] === this.state.activeItem)
    .map(resource => {
      return this.renderResourceRow(resource)
    });
  }

  componentDidMount() {
    this.getResources()
  }

  createNewResourceState = (builder) => {
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
  }

  menuTabInfo = () => [
    {key: "videos", icon: "video", title: "Videos", builder: this.vidFormBuilder},
    {key: "books", icon: "book", title: "Books", builder: this.bookFormBuilder},
    {key: "articles", icon: "pencil", title: "Articles", builder: this.articleFormBuilder}
  ]

  render() {
    const { activeItem } = this.state;
    const menuTabs = this.menuTabInfo().map(tab => {
      const triggerButton = (
        <Label
          as="a"
          size="small"
          circular
          style={{marginTop: "6px"}}
          onClick={() => this.createNewResourceState(tab.builder)}
        >
          Suggest {tab.title} Resource
        </Label>
      )
      
      const newResourcePrompt = (
        <Modal trigger={triggerButton}>
          <Modal.Header>Create New Resource</Modal.Header>
          <Modal.Content>
            {tab.builder.buildForm()}
          </Modal.Content>
        </Modal>
      )

      return (
        <Menu.Item
          name={tab.key}
          active={activeItem === tab.key}
          onClick={this.handleItemClick}
        >
          <Icon name={tab.icon} />
            {tab.title}
            {newResourcePrompt}
        </Menu.Item>
      )
    });

    const menuBar = (
      <Menu color="teal" icon="labeled" widths={3}>
        {menuTabs}
      </Menu>
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