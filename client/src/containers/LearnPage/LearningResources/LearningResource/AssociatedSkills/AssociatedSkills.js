import React from 'react'
import { Item, Segment } from 'semantic-ui-react'

const AssociatedSkills = (props) => {
  const skillList = props.skills.map(skill => (
    <Item.Group>
      <Item>
        <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
        <Item.Content verticalAlign='middle'>
          {skill["name"]}
        </Item.Content>
      </Item>
    </Item.Group>
  ))

  return (
    <Segment>
      {skillList}
    </Segment>
  )
}

export default AssociatedSkills