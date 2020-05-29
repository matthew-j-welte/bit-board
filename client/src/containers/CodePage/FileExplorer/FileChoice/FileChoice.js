import React from 'react'
import { List } from 'semantic-ui-react'

const FileChoice = (props) => (
  <List.Item 
    key={props.filename}
    name={props.filename} 
    active={props.isItemActive} 
    onClick={props.clickHandler}
  >
    <List.Icon name='file' />
    <List.Content>
      <List.Header>{props.filename}</List.Header>
    </List.Content>
  </List.Item>
)

export default FileChoice