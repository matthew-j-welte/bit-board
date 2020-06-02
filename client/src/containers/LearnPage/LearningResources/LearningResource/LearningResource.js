import React from 'react'
import { Embed, Segment, Image, Grid, Button, Modal } from 'semantic-ui-react'

import AssociatedSkills from './AssociatedSkills/AssociatedSkills'
import CommentBox from './CommentBox/CommentBox'
import SummaryBox from './SummaryBox/SummaryBox'
import ColorCloudBkg from '../../../../assets/images/color-cloud.png'
import CppBook from '../../../../assets/images/cpp-book.jpg'

const LearningResourceRow = (props) => {
  const resourceRow = (
    <Grid.Row style={{margin: "2em 2em 0em 2em"}} as={Button} onClick={() => console.log("yooo")} >
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

  return (
    <Modal style={{minHeight: "1800px"}} size="large" dimmer="blurring"
      trigger={resourceRow}
    >
      <Modal.Header>Testing new modal</Modal.Header>
      <Modal.Content>
        This some modal content
      </Modal.Content>
    </Modal>
  )
}


const VideoLearningResourceRow = (props) => (
  <LearningResourceRow
    graphicColWidth={4}
    graphic={
      <Image
        centered
        fluid
        style={{minHeight: "400px"}}
        size="medium"
        src={ColorCloudBkg}
      />
    }
    videoComponent={
      <Embed
        style={{minHeight: "300px"}}
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