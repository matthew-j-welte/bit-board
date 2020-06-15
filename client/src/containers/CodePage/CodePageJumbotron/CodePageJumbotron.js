import React, { useState } from 'react'
import { Segment, Card } from 'semantic-ui-react'

import JumbotronHeader from './JumbotronHeader/JumbotronHeader'
import { LanguageSelectButton, LanguageSelectSection } from './JumbotronSections/LanguageSelectSection/LanguageSelectSection'
import { CustomizeEditorButton, CustomizeEditorSection } from './JumbotronSections/CustomizeEditorSection/CustomizeEditorSection'

const LANGUAGE_TAB = "languageTab"
const CUSTOMIZE_EDITOR_TAB = "customizeEditor"

const CodePageJumbotron = (props) => {
  const [activeTab, setActiveTab] = useState(null)
  const [customizeEditorState, setCustomizeEditorState] = useState({
    configurationName: "",
    newConfigurationOpen: false,
    selectedSavedConfiguration: "",
    fontSize: 12,
    tabSize: 4,
    colorTheme: "",
    hasGutter: false,
    hasLineNumbers: false,
    highlightLine: false,
    editorHeight: 400
  })

  const formValueHandler = (key, val) => {
    const stateCopy = {...customizeEditorState}
    if (val === "CHECKED") {
      stateCopy[key] = !stateCopy[key]
    }
    else {
      stateCopy[key] = val
    }
    console.log(key, val)
    setCustomizeEditorState(stateCopy)
  }

  const sectionButtons = (
    <Card.Group style={{margin: "2em"}} itemsPerRow={3}>
      <LanguageSelectButton 
        selectionButtonClickHandler={() => setActiveTab(
          activeTab === LANGUAGE_TAB ? null : LANGUAGE_TAB
        )} 
      />
      <CustomizeEditorButton
        selectionButtonClickHandler={() => setActiveTab(
          activeTab === CUSTOMIZE_EDITOR_TAB ? null : CUSTOMIZE_EDITOR_TAB
        )} 
      />
    </Card.Group>
  );

  const langSelectSection = <LanguageSelectSection newLabelPulsing={props.newLabelPulsing}/>
  const customizeEditorSection = (
    <CustomizeEditorSection 
      setState={formValueHandler}
      formState={customizeEditorState}
    />
  )

  return (
    <Segment style={{background: "#f2f3f5", margin: "6em 15em 3em 15em", borderRadius: "5em"}}>
      <JumbotronHeader/>
      {sectionButtons}
      {activeTab === LANGUAGE_TAB ? langSelectSection : null}
      {activeTab === CUSTOMIZE_EDITOR_TAB ? customizeEditorSection : null}
    </Segment>
  )
}

export default CodePageJumbotron