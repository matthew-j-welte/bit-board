import React from 'react'
import { Feed, Icon, Segment, Button } from 'semantic-ui-react'

const dayDiff = (timestamp) => {
  const ts = Math.round((new Date()).getTime() / 1000);
  const secDiff = ts - timestamp
  const dayDiff = secDiff / 86400
  return Math.round(dayDiff)

}

const ResourceFeedPost = (props) => {
  console.log(props)
  const daysAgo = dayDiff(props.posted)
  const datePrompot = daysAgo ? `Posted ${daysAgo} days ago` : "Posted Today"
  return (
    <Feed.Event style={{marginBottom: "1.75em"}}>
      <Feed.Label image={props.profileimage}/>
      <Feed.Content>
        <Feed.Summary>
          <a>{props.fullname}</a>
          <Feed.Date>{datePrompot}</Feed.Date>
        </Feed.Summary>
        <Feed.Content style={{marginBottom: "0"}} as={Segment} text>
          <p style={{whiteSpace: "pre-wrap"}}>{props.content}</p>
        </Feed.Content>
        <Feed.Meta>
          <Feed.Like onClick={() => props.postFieldIncrementHandle(props._id, "likes")}>
            <Icon name='like' />{props.likes} Likes
          </Feed.Like>
          <Feed.Like onClick={() => props.postFieldIncrementHandle(props._id, "reports")}>
            <Icon name='cancel' /> Report Post
        </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )
}

export default ResourceFeedPost
