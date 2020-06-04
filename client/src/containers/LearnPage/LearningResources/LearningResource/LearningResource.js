import React from 'react'
import { Card } from 'semantic-ui-react'
import axios from '../../../../axios'

import AssociatedSkills from './AssociatedSkills/AssociatedSkills'
import ResourceModal from './ResourceModal/ResourceModal'

const LearningResourceCard = (props) => {
  const handleView = () => {
    const uri = "/api/learn/resource/" + props._id + "/viewers/increment"
    axios.put(uri, null,
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }
    )
  }
  
  const resourceRow = (
    <Card
      raised
      onClick={() => handleView(props._id)}
    >
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
      id={props._id}
      userId={props.userId}
    />
  )
}

export default LearningResourceCard