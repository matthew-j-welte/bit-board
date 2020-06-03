import React from 'react'
import { Feed, Segment, Modal, Header, Icon, Divider, Card, Progress } from 'semantic-ui-react'

const ResourceModal = (props) => {
  const skills = [{
    skill: "Python",
    color: "violet"
  },
  {
    skill: "Artificial Intelligence",
    color: "teal"
  },
  {
    skill: "Operating System",
    color: "pink"
  },
  {
    skill: "Systems Engineering",
    color: "orange"
  },
  {
    skill: "User Interface",
    color: "gold"
  },
  {
    skill: "Communication",
    color: "red"
  },
  {
    skill: "Super Learning",
    color: "pink"
  }].map(skill => (
    <Card style={{background: "#242424", borderRadius:"1em"}}>
      <Divider horizontal inverted style={{marginTop:"1.25em"}}>
        <Header color={skill.color} size="small" inverted as="span">{skill.skill}</Header>
      </Divider>
      <Progress 
        inverted 
        color={skill.color} 
        percent={35}
        style={{margin:"0em 1em 1em 1em"}}/>
    </Card>
  ))



  const comments = [{
    img: "joe",
    user: "Joe Henderson",
    daysAgo: 12,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon."
  },
  {
    img: "elliot",
    user: "Elliot Peters",
    daysAgo: 2,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon."
  },
  {
    img: "jenny",
    user: "Jen Pikkey",
    daysAgo: 4,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon."
  },
  {
    img: "justen",
    user: "Justen Randerson",
    daysAgo: 41,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon."
  }].map(comment => (
    <Feed.Event>
      <Feed.Label image={'https://react.semantic-ui.com/images/avatar/large/' + comment.img + '.jpg'} />
      <Feed.Content>
        <Feed.Summary>
          <a>{comment.user}</a>
          <Feed.Date>{comment.daysAgo} days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          {comment.content}
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />5 Likes
          </Feed.Like>
          <Feed.Like>
            <Icon name='cancel' />Report
        </Feed.Like>
        </Feed.Meta>
        <Divider/>
      </Feed.Content>
    </Feed.Event>
  ))

  return (
    <Modal style={{minHeight: "1800px"}} size="large" dimmer="blurring"
      trigger={props.resourceRow}
    >
      {props.graphic}
      <Segment basic padded="very">
        <Header as='h2' style={{color: "#b880d1"}}>
          <Icon name='clipboard outline' />
          <Header.Content>
            Resource Description
            <Header.Subheader>Submitted By: <em>Matthew Welte</em></Header.Subheader>
          </Header.Content>
        </Header>
        <Divider/>
          <p style={{fontSize: "1.1em"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
        <Header as='h2' style={{marginTop: "2.5em", color: "#b880d1"}}>
          <Icon name='hourglass half' />
          <Header.Content>
            Rationale
            <Header.Subheader>Submitted By: <em>Matthew Welte</em></Header.Subheader>
          </Header.Content>
        </Header>
        <Divider/>
          <p style={{fontSize: "1.1em"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <Header as='h2' style={{marginTop: "2.5em", color: "#b880d1"}}>
            <Icon name='star' />
            <Header.Content>
              Associated Skills
            </Header.Content>
          </Header>
          <Divider/>
            <Card.Group inverted stackable itemsPerRow={3}>
              {skills}
            </Card.Group>
        <Header as='h2' style={{marginTop: "3.5em", color: "#b880d1"}}>
          <Icon name='feed'/>
          <Header.Content>
            Top Comments
          </Header.Content>
        </Header>
        <Divider/>
          <Feed>
            {comments}
          </Feed>
      </Segment>
    </Modal>
  )
}

export default ResourceModal