import React from 'react'
import { Feed, Icon, Divider } from 'semantic-ui-react'

const ResourceFeedPost = (props) => (
  <Feed.Event>
    <Feed.Label image={'https://react.semantic-ui.com/images/avatar/large/' + props.img + '.jpg'} />
    <Feed.Content>
      <Feed.Summary>
        <a>{props.user}</a>
        <Feed.Date>{props.daysAgo} days ago</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>
        {props.content}
      </Feed.Extra>
      <Feed.Meta>
        <Feed.Like>
          <Icon name='like' />{props.likes} Likes
        </Feed.Like>
        <Feed.Like>
          <Icon name='cancel' />Report
      </Feed.Like>
      </Feed.Meta>
      <Divider/>
    </Feed.Content>
  </Feed.Event>
)

export default ResourceFeedPost
