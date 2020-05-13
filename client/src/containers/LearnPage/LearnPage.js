import React, { Component } from 'react'

import { Menu, Icon, Segment, Grid, Feed, Item } from 'semantic-ui-react'

import axios from '../../axios'
import { 
  VideoLearningResourceRow, 
  ReadingLearningResourceRow 
} from './components/LearningResources'


import ColorCloudBkg from '../../assets/images/color-cloud.png'
import CppBook from '../../assets/images/cpp-book.jpg'

const imageMap = {
  "cpp-book": CppBook,
  "color-cloud": ColorCloudBkg
}

class LearnPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "1828dec38879419fad0ce23fe1323fa4",
      activeItem: "videos",
      resources: []
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getResources() {
    const uri = "/api/user/" + this.state.userId + "/learn/resources"
    axios.get(uri).then(res => {
      if (res.data) {
        console.log(res.data)
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
      const datePrompt = dayEstimate > 0 ? `Posted ${dayEstimate} day${dayEstimate == 1 ? "" : "s"} ago` : "Posted Today"
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
    return this.state.resources.map(resource => {
      if (resource["type"] === this.state.activeItem) {
        return this.renderResourceRow(resource)
      }
    });
  }

  componentDidMount() {
    this.getResources()
  }

  render() {
    const { activeItem } = this.state;
    const menuTabs = [
      {key: "videos", icon: "video", title: "Videos"},
      {key: "books", icon: "book", title: "Books"},
      {key: "articles", icon: "pencil", title: "Articles"}
    ].map(tab => (
      <Menu.Item
        name={tab.key}
        active={activeItem === tab.key}
        onClick={this.handleItemClick}
      >
        <Icon name={tab.icon} />
        {tab.title}
      </Menu.Item>     
    ));
    const menuBar = (
      <Menu color="teal" icon="labeled" widths={3}>
        {menuTabs}
      </Menu>
    )

    return (
      <Segment style={{minHeight: "1200px"}}>
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

export default LearnPage