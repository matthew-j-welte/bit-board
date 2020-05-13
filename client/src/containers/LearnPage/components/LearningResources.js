import React from 'react'

import { Embed, Icon, Segment, Image, Grid, Card, Feed } from 'semantic-ui-react'

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

export default VideoLearningResourceRow
export default ReadingLearningResourceRow