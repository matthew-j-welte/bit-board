import React from 'react'
import { Header, Icon, Divider } from 'semantic-ui-react'

const ResourceModalSection = (props) => {
  let subheader = null
  if (props.subheader) {
    subheader = <Header.Subheader>{props.subheader}</Header.Subheader>
  }
  return (
    <div>
      <Header as='h2' style={{color: "#b880d1", ...props.style}}>
        <Icon name={props.icon} />
        <Header.Content>
          {props.title}
          {subheader}
        </Header.Content>
      </Header>
      <Divider/>
      {props.children}
    </div>
  )
}

export default ResourceModalSection