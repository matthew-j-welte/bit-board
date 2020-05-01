import React, { Component } from 'react'

import { Embed, Menu, Icon, Segment, Image, Grid, Card, Feed, Item } from 'semantic-ui-react'

import axios from '../../axios'

import ColorCloudBkg from '../../assets/images/color-cloud.png'
import CppBook from '../../assets/images/cpp-book.jpg'
import AIImage from '../../assets/images/ai-placeholder.jpg'

const imageMap = {
  "cpp-book": CppBook,
  "color-cloud": ColorCloudBkg
}

const LearningResourceRow = (props) => (
  <Grid.Row>
    <Grid.Column width={props.graphicColWidth}>
      <Segment>
        {props.graphic}
      </Segment>
    </Grid.Column>
    <Grid.Column width={props.descriptionColWidth}>
    <Card fluid>
        <Card.Content meta={props.author} header={props.title} description={props.description}/>
        <Card.Content extra>
          <Icon name='user' />{props.userCount} {props.userCountNoun}
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column width={5}>
      <Segment>
        <Feed>
          {props.comments}
        </Feed>
      </Segment>
    </Grid.Column>
    <Grid.Column width={3}>
      <Segment>
        {props.associatedSkills}
      </Segment>
    </Grid.Column>
  </Grid.Row>
)

const VideoLearningResourceRow = (props) => (
  <LearningResourceRow
    graphicColWidth={5}
    graphic={
      <Embed
        style={{minHeight: "300px"}}
        id={props.videoId}
        placeholder={props.placeholderImage}
        source={props.videoSource}
      />
    }
    descriptionColWidth={3}
    userCountNoun="Viewers"
    {...props}
  />
)

const ReadingLearningResourceRow = (props) => (
  <LearningResourceRow
    graphicColWidth={4}
    graphic={
      <Image
        centered
        fluid
        style={{minHeight: "400px"}}
        size="medium"
        src={props.image}
      />
    }
    descriptionColWidth={4}
    userCountNoun="Readers"
    {...props}
  />
)

class LearnPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "100",
      activeItem: "videos",
      resources: []
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getResources() {
    const uri = "/api/user/" + this.state.userId + "/learn/resources"
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
    const menuBar = (
      <Menu color="teal" icon="labeled" widths={3}>
        <Menu.Item
          name='videos'
          active={activeItem === 'videos'}
          onClick={this.handleItemClick}
        >
          <Icon name='video' />
          Videos
        </Menu.Item>
        <Menu.Item
          name='books'
          active={activeItem === 'books'}
          onClick={this.handleItemClick}
        >
          <Icon name='book' />
          Books
        </Menu.Item>
        <Menu.Item
          name='articles'
          active={activeItem === 'articles'}
          onClick={this.handleItemClick}
        >
          <Icon name='pencil' />
          Articles
        </Menu.Item>
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