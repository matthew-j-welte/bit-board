import React from 'react'
import { Header, Divider, Card } from 'semantic-ui-react'

const ACTIVE_STYLE = "0px 0px 12px #276fe3"

const SelectionCard = (props) => (
  <Card 
    raised
    onClick={props.handler} 
    style={{borderRadius: "2em", "box-shadow": props.title === props.activeTab ? ACTIVE_STYLE : ""}}
  >
    <Card.Content textAlign="center">
      <Header size="small" style={{marginTop: "1px"}}>{props.title}</Header>
      <Divider/>
      <Card.Meta>{props.desc}</Card.Meta>
    </Card.Content>
  </Card>
)

export default SelectionCard