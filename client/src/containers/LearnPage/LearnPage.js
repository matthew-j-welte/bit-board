import React, { Component } from 'react'

import { Embed, Menu, Icon, Segment, Image, Grid, Card, Feed, Item } from 'semantic-ui-react'

import axios from '../../axios'

import ColorCloudBkg from '../../assets/images/color-cloud.png'
import CppBook from '../../assets/images/cpp-book.jpg'
import AIImage from '../../assets/images/ai-placeholder.jpg'

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
        {props.comments}
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
      activeItem: "videos"
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    console.log("Did mount");
  }

  render() {
    const { activeItem } = this.state;

    const mockComments = (
      <Feed>
        <Feed.Event
          icon='pencil'
          date='Today'
          summary="This is supposed to be some moderately lengty comment giving a description of what was seen on this video and what they think"
        />
      </Feed>
    );

    const mockSkills = (
    <Item.Group>
      <Item>
        <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
        <Item.Content verticalAlign='middle'>
          Kubernetes
        </Item.Content>
      </Item>
    </Item.Group>
    )

    const compV = (
      <VideoLearningResourceRow
        videoId="O6Xo21L0ybE"
        placeholderImage={ColorCloudBkg}
        videoSource="youtube"
        author="Grizzly Bear"
        title="Bear Waves Hello"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining"
        userCount={45934}
        comments={mockComments}
        associatedSkills={mockSkills}
      />
    )

    const compB = (
      <ReadingLearningResourceRow
        image={CppBook}
        author="Bjarne Stroustrup"
        title="The C++ Programming Language"
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32'
        userCount={22080}
        comments={mockComments}
        associatedSkills={mockSkills}
      />
    )

    const compA = (
      <ReadingLearningResourceRow
        image={AIImage}
        author="Lex Fridman"
        title="Advanced Neural Networks"
        description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
        userCount={1892}
        comments={mockComments}
        associatedSkills={mockSkills}
      />
    )


    let resources = undefined
    if (this.state.activeItem === "videos") {
      resources = compV
    }
    else if (this.state.activeItem === "books") {
      resources = compB
    }
    else if (this.state.activeItem === "articles") {
      resources = compA
    }

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
            {resources}
          </Grid>
        </Segment>
      </Segment>
    )
  }
}

export default LearnPage