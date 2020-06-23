import React from 'react'
import { Segment, Card, Label, Header, Divider } from 'semantic-ui-react'

import SelectionCard from '../components/SelectionCard/SelectionCard'

export const KeyboardShortcutButton = (props) => (
  <SelectionCard 
    activeTab={props.activeTab}    
    handler={props.selectionButtonClickHandler}
    title="VIEW KEYBOARD SHORTCUTS"
    desc="The goal with our code editor is to keep you from ever having to leave your keyboard when diving deep into some of our more complex challenges. Allowing you to quickly change font size, tab index, navigate different files and more."
  />
)


export const KeyboardShortcutSection = (props) => {
  const cards = [1,1,1,1].map(
    (card) => {
      return (
        <Card>
          <Segment textAlign="center">
            <Header as="h5">shortcut title could be this long possibly</Header>
            <Divider/>
            <Label.Group size="medium">
              <Label  content="ctrl"/>
              <Label  circular content="+"/>
              <Label  content="t"/>
            </Label.Group>
          </Segment>
          
        </Card>
      )
    }
  )

  return (
    <Segment basic style={{margin: "3em", padding: "2em", borderRadius: "3em"}}>
      <Header>Sizing Shortcuts</Header>
      <Card.Group itemsPerRow={6}>
        {cards}
      </Card.Group>
      <Header>Navigation Shortcuts</Header>
      <Card.Group itemsPerRow={6}>
        {cards}
      </Card.Group>
      <Header>Misc Shortcuts</Header>
      <Card.Group itemsPerRow={6}>
        {cards}
      </Card.Group>
    </Segment>    
  )
}
