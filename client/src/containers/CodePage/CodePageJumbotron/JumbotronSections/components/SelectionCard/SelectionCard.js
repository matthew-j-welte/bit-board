import React from 'react'
import { Header, Divider, Card } from 'semantic-ui-react'

const SelectionCard = (props) => (
  <Card onClick={props.handler} style={{borderRadius: "2em"}}>
    <Card.Content textAlign="center">
      <Header size="small" style={{marginTop: "1px"}}>{props.title}</Header>
      <Divider/>
      <Card.Meta>{props.desc}</Card.Meta>
    </Card.Content>
  </Card>
)

export default SelectionCard