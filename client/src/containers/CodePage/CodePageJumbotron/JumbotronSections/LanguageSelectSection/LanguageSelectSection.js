import React from 'react'
import { Segment, Card } from 'semantic-ui-react'

import SelectionCard from '../components/SelectionCard/SelectionCard'
import LanguageCards from './LanguageCards/LanguageCards'

export const LanguageSelectButton = (props) => (
  <SelectionCard 
    activeTab={props.activeTab}  
    handler={props.selectionButtonClickHandler}
    title="SELECT A LANGUAGE"
    desc="BitBoard currently supports a number of coding languages, each with their own set of unique challenges - ranging from basic problem solving to more advanced architectural based projects"
  />
)


export const LanguageSelectSection = (props) => (
  <Segment basic style={{margin: "3em", padding: "2em", borderRadius: "3em"}}>
    <Card.Group itemsPerRow={5}>
      <LanguageCards
        newLabelPulsing={props.newLabelPulsing}
        languageSelectHandler={props.languageSelectHandler}
      />
    </Card.Group>
  </Segment>
  
)
