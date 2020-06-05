import React, { useState } from 'react'
import { Feed, Icon, Segment, Button, Header } from 'semantic-ui-react'

const dayDiff = (timestamp) => {
  const ts = Math.round((new Date()).getTime() / 1000);
  const secDiff = ts - timestamp
  const dayDiff = secDiff / 86400
  return Math.round(dayDiff)

}

const ResourceFeedPost = (props) => {
  const [liked, setLiked] = useState(false)
  const [reported, setReported] = useState(false)
  const daysAgo = dayDiff(props.posted)
  const datePrompot = daysAgo===1 ? "Posted Yesterday" : daysAgo ? `Posted ${daysAgo} days ago` : "Posted Today"

  return (
    <Feed.Event style={{marginBottom: "1.75em"}}>
      <Feed.Label image={props.profileimage}/>
      <Feed.Content>
        <Feed.Summary style={{fontSize:"1.2em"}}>
          <a>{props.fullname}</a>
        </Feed.Summary>
        <Feed.Date style={{marginTop: "0.5em", fontSize:"0.9em"}}>{datePrompot}</Feed.Date>
        <Feed.Content style={{marginBottom: "0"}} as={Segment} text>
          <p style={{whiteSpace: "pre-wrap"}}>{props.content}</p>
        </Feed.Content>
        <Feed.Meta>
          <Feed.Like 
            circular
            active={liked} 
            as={Button} 
            onClick={() => {
              setLiked(!liked)
              props.postFieldIncrementHandler(props._id, "likes")
            }}
          >
            <Icon name='like' />{liked ? props.likes + 1: props.likes} Likes
          </Feed.Like>
          <Feed.Like 
            circular
            active={reported} 
            as={Button} 
            onClick={() => {
              setReported(!reported)
              props.postFieldIncrementHandler(props._id, "reports")
            }}
          >
            <Icon name='cancel' />Report Post
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )
}

export default ResourceFeedPost
