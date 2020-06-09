import React, { useState } from 'react'
import { Feed, Button } from 'semantic-ui-react'

import ResourceFeedPost from './ResourceFeedPost/ResourceFeedPost'
import ResourceModalSection from '../ResourceModalSection/ResourceModalSection'

const BUTTON_PROMPTS = {
  true: "Show all Posts",
  false: "Hide Posts"
}

const ResourceFeed = (props) => {  
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [showAllPostsButtonActive, setButtonPrompt] = useState(true)

  let posts = !props.posts ? [] : props.posts
  .sort((a, b) => {
    if (a.likes === b.likes ) {
      return (a.posted > b.posted) ? 1 : -1
    }
    return (a.likes < b.likes) ? 1 : -1
  })
  .map(post => (
    <ResourceFeedPost 
      postFieldIncrementHandler={props.postFieldIncrementHandler}
      {...post}
    /> 
  ))

  if (!showAllPosts) {
    posts = posts.slice(0,3)
  }

  return (
    <ResourceModalSection
      title="Top Posts"
      icon="feed"
      divStyle={{
        marginTop: "4.5em",
        padding: "1em"
      }}
    >
      <Feed>
        {posts}
      </Feed>
      <Button 
        size="big" 
        fluid
        content={BUTTON_PROMPTS[showAllPostsButtonActive]}
        onClick={() => {
          setShowAllPosts(!showAllPosts)
          setButtonPrompt(!showAllPostsButtonActive)
        } }
      />
    </ResourceModalSection>
  )
}

export default ResourceFeed
