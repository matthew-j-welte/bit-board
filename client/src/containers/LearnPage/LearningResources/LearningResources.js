import React from 'react'

import VideoResourceCard from './LearningResource/VideoResource'
import BookResourceCard from './LearningResource/BookResource'
import { Card } from 'semantic-ui-react'

const resourceTypeToComponentMap = {
  videos: (resourceInfo, userId) => <VideoResourceCard userId={userId} {...resourceInfo} />,
  books: (resourceInfo, userId) => <BookResourceCard userId={userId} {...resourceInfo} />,
  articles: (resourceInfo, userId) => <BookResourceCard userId={userId} {...resourceInfo} />
}

const LearningResources = (props) => {
  const activeResourceType = props.activeResourceTypeTab
  const activeResourcesComponents = props.resources[props.activeResourceTypeTab].map(resource => {
    return resourceTypeToComponentMap[activeResourceType](resource, props.userId)
  })
  return (
    <Card.Group itemsPerRow={3} stackable>
      {activeResourcesComponents}
    </Card.Group>
  ) 
}

export default LearningResources