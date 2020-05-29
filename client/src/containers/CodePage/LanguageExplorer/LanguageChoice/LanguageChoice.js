import React from 'react'
import { List, Image } from 'semantic-ui-react'

const LanguageChoice = (props) => (
  <List.Item 
    name={props.language} 
    active={props.isItemActive} 
    onClick={props.clickHandler}
  >
    <Image avatar src={props.logo}/>
    <List.Content>
      <List.Header>{props.language}</List.Header>
    </List.Content>
  </List.Item>
)

export default LanguageChoice