import React from 'react'
import {Icon, Card } from 'semantic-ui-react'

const SummaryBox = (props) => (
  <Card fluid>
    <Card.Content meta={props.author} header={props.title} description={props.description}/>
    <Card.Content extra>
      <Icon name='user' />{props.viewers} {props.userCountNoun}
    </Card.Content>
  </Card>
)

export default SummaryBox