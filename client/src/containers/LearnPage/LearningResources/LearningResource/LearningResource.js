import React from 'react'
import { Embed, Segment, Image, Grid } from 'semantic-ui-react'

import AssociatedSkills from './AssociatedSkills/AssociatedSkills'
import CommentBox from './CommentBox/CommentBox'
import SummaryBox from './SummaryBox/SummaryBox'
import ColorCloudBkg from '../../../../assets/images/color-cloud.png'
import CppBook from '../../../../assets/images/cpp-book.jpg'

const LearningResourceRow = (props) => (
  <Grid.Row>
    <Grid.Column width={props.graphicColWidth}>
      <Segment>
        {props.graphic}
      </Segment>
    </Grid.Column>
    <Grid.Column width={props.descriptionColWidth}>
      <SummaryBox 
        author={props.author}
        title={props.title}
        description={props.description}
        viewers={props.viewers}
        userCountNoun={props.userCountNoun}
      />
    </Grid.Column>
    <Grid.Column width={5}>
      <CommentBox comments={props.comments}/>
    </Grid.Column>
    <Grid.Column width={3}>
      <AssociatedSkills skills={props.skills}/>
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
        placeholder={ColorCloudBkg}
        source="youtube"
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
        src={CppBook}
      />
    }
    descriptionColWidth={4}
    userCountNoun="Readers"
    {...props}
  />
)

export {
  VideoLearningResourceRow,
  ReadingLearningResourceRow
}