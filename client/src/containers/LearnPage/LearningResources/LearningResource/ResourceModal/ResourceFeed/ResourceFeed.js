import React from 'react'
import { Feed } from 'semantic-ui-react'

import ResourceFeedPost from './ResourceFeedPost/ResourceFeedPost'
import ResourceModalSection from '../ResourceModalSection/ResourceModalSection'

const ResourceFeed = (props) => {  
  
  let posts = !props.posts ? [] : props.posts
  .sort((a, b) => {
    if (a.likes === b.likes ) {
      return (a.posted > b.posted) ? 1 : -1
    }
    return (a.likes < b.likes) ? 1 : -1
  })
  .map(post => <ResourceFeedPost {...post}/>)

  if (!props.showAllPosts) {
    posts = posts.slice(0,3)
  }

  return (
    <ResourceModalSection
      title="Top Posts"
      icon="feed"
      style={{marginTop: "2.5em"}}
    >
      <Feed>
        {posts}
      </Feed>
    </ResourceModalSection>
  )
}

export default ResourceFeed
