import React from 'react'

import ResourceModalSection from '../ResourceModalSection/ResourceModalSection'

const RationaleSection = (props) => (
  <ResourceModalSection
    title="Rationale"
    icon="hourglass half"
    subheader={<p>Submitted By: <em>{props.author}</em></p>}
    style={{marginTop: "2.5em"}}
  >
    <p>{props.content}</p>
  </ResourceModalSection>
)

export default RationaleSection