import React from 'react'

import { VideoLearningResourceRow, ReadingLearningResourceRow } from './LearningResource/LearningResource'
import { Card } from 'semantic-ui-react'

const resourceTypeToComponentMap = {
  videos: (props) => <VideoLearningResourceRow {...props} />,
  books: (props) => <ReadingLearningResourceRow {...props} />,
  articles: (props) => <ReadingLearningResourceRow {...props} />
}

const LearningResources = (props) => {
  const activeResourceType = props.activeResourceTypeTab
  const activeResourcesComponents = props.resources[props.activeResourceTypeTab].map(resource => {
    return resourceTypeToComponentMap[activeResourceType](resource)
  })
  return (
    <Card.Group itemsPerRow={3} stackable>
      {activeResourcesComponents}
    </Card.Group>
  ) 
}

export default LearningResources