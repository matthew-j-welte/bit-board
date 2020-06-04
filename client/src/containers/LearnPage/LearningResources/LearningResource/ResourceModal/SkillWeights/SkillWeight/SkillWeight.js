import React from 'react'
import { Header, Divider, Card, Progress } from 'semantic-ui-react'

const SkillWeight = (props) => (
  <Card style={{background: "#242424", borderRadius:"1em"}}>
  <Divider horizontal inverted style={{marginTop:"1.25em"}}>
    <Header color={props.color} size="small" inverted as="span">{props.name}</Header>
  </Divider>
  <Progress 
    inverted 
    color={props.color} 
    percent={props.weight}
    style={{margin:"0em 1em 1em 1em"}}/>
</Card>
)

export default SkillWeight