import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import ColorCloudBkg from '../../../../assets/images/color-cloud.png'
import * as constants from './constants'

const Project = (props) => (
  <Card 
    key={props._id} 
    raised 
    href="#"
    style={{
      borderStyle:"ridge", 
      borderColor: constants.phaseToColorMap[props.phase], 
      borderRadius: "2em"
    }} 
  >
    <Card.Content textAlign="center">
      <Card.Header>{props.name}</Card.Header>
    </Card.Content>
    <Image src={ColorCloudBkg} wrapped ui={false} />
    <Card.Content textAlign="center">
      <Card.Description>
        {props.description}
      </Card.Description>
    </Card.Content>
    <Card.Content  
      extra
      textAlign="center"
      style={{
        margin: ".25em 0em 1.75em 0em", 
        background: constants.phaseToColorMap[props.phase]
      }}
    >
      <Icon name="caret right"/>
      <strong style={{color: "black"}}>{ props.phase.toUpperCase()}</strong>
      <Icon name="caret left"/>
    </Card.Content>
  </Card>
)

export default Project