import React from 'react'
import { Embed, Image, Card, Table, Rating, Header, Segment, Progress, Checkbox } from 'semantic-ui-react'

import AssociatedSkills from './AssociatedSkills/AssociatedSkills'
import ColorCloudBkg from '../../../../assets/images/color-cloud.png'
import CppBook from '../../../../assets/images/cpp-book.jpg'
import ResourceModal from './ResourceModal/ResourceModal'

const LearningResourceRow = (props) => {
  const resourceRow = (
    <Card raised>
      {props.graphicPreview}
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>
        <span className='date'>Views: {props.viewers}</span>
      </Card.Meta>
      <Card.Description>
        {props.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign="center">
      <AssociatedSkills skills={props.skills}/>
    </Card.Content>
  </Card>
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
    graphicPreview={
      <Image
        // fluid
        style={{maxHeight: "400px", minHeight: "400px"}}
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
    {...props}
  />
)

const ReadingLearningResourceRow = (props) => {
  const graphicPreview = (
    <Image
      fluid
      style={{maxHeight: "400px", minHeight: "400px"}}
      src={CppBook}
    />
  )
  const graphic = (
    <Segment>
  <Table celled compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={1}>Chapter</Table.HeaderCell>
        <Table.HeaderCell width={6}>Title</Table.HeaderCell>
        <Table.HeaderCell width={0.5}>Finished</Table.HeaderCell>
        <Table.HeaderCell width={0.5}>Tested</Table.HeaderCell>
        <Table.HeaderCell width={8}>Progress</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell textAlign="center">1</Table.Cell>
        <Table.Cell singleLine>Scalar Types and Variables</Table.Cell>
        <Table.Cell textAlign='center'><Checkbox/></Table.Cell>
        <Table.Cell textAlign='center'><Checkbox/></Table.Cell>
        <Table.Cell><Progress indicating style={{marginBottom: "0"}}/></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    </Segment>
  )
  return (
    <LearningResourceRow
      graphic={graphic}
      graphicPreview={graphicPreview}
      {...props}
    />
  )
}

export {
  VideoLearningResourceRow,
  ReadingLearningResourceRow
}