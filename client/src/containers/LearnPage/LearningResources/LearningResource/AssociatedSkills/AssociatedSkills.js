import React from 'react'
import { Item, Card, Segment, Header } from 'semantic-ui-react'

const AssociatedSkills = (props) => {
  const skillList = props.skills.map(skill => (
    <Card.Group itemsPerRow={1}>
      <Card style={{minHeight: "2em", background: "#242424", borderRadius:"5em"}}>
        <Header textAlign="center" inverted size="medium" style={{margin: "1em"}}>{skill}</Header>
      </Card>
    </Card.Group>
  ))

  return (
    <Segment>
      {skillList}
    </Segment>
  )
}

export default AssociatedSkills