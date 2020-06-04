import React from 'react'
import { Item, Card, Segment, Header, Label, Icon } from 'semantic-ui-react'

const AssociatedSkills = (props) => {
  const skillList = props.skills.slice(0,4).map(skill => (
    <Label circular>
      {skill}
    </Label>
  ))

  return skillList
}

export default AssociatedSkills