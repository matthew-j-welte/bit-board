import React, { useState } from 'react'
import { Segment, Card } from 'semantic-ui-react'

import JumbotronHeader from './JumbotronHeader/JumbotronHeader'
import { LanguageSelectButton, LanguageSelectSection } from './JumbotronSections/LanguageSelectSection/LanguageSelectSection'

const LANGUAGE_TAB = "languageTab"

const CodePageJumbotron = (props) => {
  const [activeTab, setActiveTab] = useState(null)

  const sectionButtons = (
    <Card.Group style={{margin: "2em"}} itemsPerRow={3}>
      <LanguageSelectButton 
        selectionButtonClickHandler={() => setActiveTab(activeTab === LANGUAGE_TAB ? null : LANGUAGE_TAB)} 
      />
      <LanguageSelectButton 
        selectionButtonClickHandler={() => setActiveTab(activeTab === LANGUAGE_TAB ? null : LANGUAGE_TAB)} 
      />
    </Card.Group>
  );

  const langSelectSection = (
    <LanguageSelectSection 
      newLabelPulsing={props.newLabelPulsing}
    />
  )

  return (
    <Segment style={{background: "#f2f3f5", margin: "6em 15em 3em 15em", borderRadius: "5em"}}>
      <JumbotronHeader/>
      {sectionButtons}
      {activeTab === LANGUAGE_TAB ? langSelectSection : null}
    </Segment>
  )
}

export default CodePageJumbotron