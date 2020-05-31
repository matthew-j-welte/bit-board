import React from 'react'
import { Segment, Feed } from 'semantic-ui-react'

const CommentBox = (props) => {
  const commentList = props.comments.map(comment => {
    const elapsedTime = (new Date().getTime() / 1000) - comment["datePosted"]
    const dayEstimate = Math.round(elapsedTime / 86400)
    const datePrompt = dayEstimate > 0 ? `Posted ${dayEstimate} day${dayEstimate === 1 ? "" : "s"} ago` : "Posted Today"
    return (
      <Feed.Event
        icon="pencil"
        date={datePrompt}
        summary={comment["content"]}
      />
    )
  })

  return (
    <Segment>
      <Feed>
        {commentList}
      </Feed>
    </Segment>
  )
}

export default CommentBox