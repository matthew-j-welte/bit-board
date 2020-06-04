import React from 'react'
import { Card } from 'semantic-ui-react'

import SkillWeight from './SkillWeight/SkillWeight'
import ResourceModalSection from '../ResourceModalSection/ResourceModalSection'

const SkillWeights = (props) => {
  const skills = props.skills
  .sort((a, b) => (a.weight < b.weight) ? 1 : -1)
  .map(skill => <SkillWeight {...skill}/>)
  

  return (
    <ResourceModalSection
      title="Associated Skills"
      icon="star"
      style={{marginTop: "2.5em"}}
    >
      <Card.Group inverted stackable itemsPerRow={3}>
        {skills}
      </Card.Group>
    </ResourceModalSection>
  )
}

export default SkillWeights
