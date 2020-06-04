import React from 'react'

import ResourceModalSection from '../ResourceModalSection/ResourceModalSection'

const DescriptionSection = (props) => (
  <ResourceModalSection
    title="Resource Description"
    icon="clipboard outline"
    subheader={<p>Submitted By: <em>{props.author}</em></p>}
  >
    <p>{props.content}</p>
  </ResourceModalSection>
)

export default DescriptionSection