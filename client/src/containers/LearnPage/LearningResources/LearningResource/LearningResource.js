import React from 'react'
import { Embed, Segment, Image, Grid, Card } from 'semantic-ui-react'

import AssociatedSkills from './AssociatedSkills/AssociatedSkills'
import CommentBox from './CommentBox/CommentBox'
import SummaryBox from './SummaryBox/SummaryBox'
import ColorCloudBkg from '../../../../assets/images/color-cloud.png'
import CppBook from '../../../../assets/images/cpp-book.jpg'
import ResourceModal from './ResourceModal/ResourceModal'

const LearningResourceRow = (props) => {
  const resourceRow = (
    <Grid.Row style={{margin: "2em 2em 0em 2em"}} as={Card} onClick={() => console.log("yooo")} >
      <Grid.Column width={props.graphicColWidth}>
        <Segment>
          {props.graphicPreview}
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

  return (
    <ResourceModal 
      resourceRow={resourceRow}
      graphic={props.graphic}
    />
  )
}


const VideoLearningResourceRow = (props) => (
  <LearningResourceRow
    graphicColWidth={4}
    graphicPreview={
      <Image
        centered
        fluid
        style={{minHeight: "400px"}}
        size="medium"
        src={ColorCloudBkg}
      />
    }
    graphic={
      <Embed
        id={props.videoId}
        placeholder={ColorCloudBkg}
        source="youtube"
      />
    }
    descriptionColWidth={4}
    userCountNoun="Viewers"
    {...props}
  />
)

const ReadingLearningResourceRow = (props) => {
  const graphic = (
    <Image
      centered
      fluid
      style={{minHeight: "400px"}}
      size="medium"
      src={CppBook}
    />
  )
  return (
    <LearningResourceRow
      graphicColWidth={4}
      graphic={graphic}
      graphicPreview={graphic}
      descriptionColWidth={4}
      userCountNoun="Readers"
      {...props}
    />
  )
}

export {
  VideoLearningResourceRow,
  ReadingLearningResourceRow
}