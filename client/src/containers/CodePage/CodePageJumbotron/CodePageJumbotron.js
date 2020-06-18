import React, { useState } from 'react'
import { Segment, Card } from 'semantic-ui-react'

import JumbotronHeader from './JumbotronHeader/JumbotronHeader'
import { LanguageSelectButton, LanguageSelectSection } from './JumbotronSections/LanguageSelectSection/LanguageSelectSection'
import { CustomizeEditorButton, CustomizeEditorSection } from './JumbotronSections/CustomizeEditorSection/CustomizeEditorSection'
import { KeyboardShortcutButton, KeyboardShortcutSection } from './JumbotronSections/KeyboardShortcutSection/KeyboardShortcutSection'

const LANGUAGE_TAB = "languageTab"
const CUSTOMIZE_EDITOR_TAB = "customizeEditorTab"
const KEYBOARD_TAB = "keyboardShortcutTab"

const CodePageJumbotron = (props) => {
  const [activeTab, setActiveTab] = useState(null)
  const [customizeEditorState, setCustomizeEditorState] = useState({
    configurationName: "",
    newConfigurationOpen: false,
    selectedSavedConfiguration: "",
    fontSize: 14,
    tabSize: 4,
    colorTheme: "",
    colorThemeUrl: "",
    hasGutter: true,
    hasLineNumbers: true,
    highlightLine: false,
    editorHeight: 600
  })

  const formValueHandler = (key, val) => {
    const stateCopy = {...customizeEditorState}
    if (val === "CHECKED") {
      stateCopy[key] = !stateCopy[key]
    }
    else {
      stateCopy[key] = val
    }
    setCustomizeEditorState(stateCopy)
  }

  const setState = (newState) => {
    setCustomizeEditorState({...customizeEditorState, ...newState})
  }

  const sectionButtons = (
    <Card.Group style={{margin: "2em"}} itemsPerRow={3}>
      <LanguageSelectButton 
        selectionButtonClickHandler={() => {
          const curState = activeTab === LANGUAGE_TAB ? null : LANGUAGE_TAB
          setActiveTab(
            curState
          );
          if (curState) {
            props.startNewLabelPulsing()
          }
          else {
            props.stopNewLabelPulsing()
          }
        }} 
      />
      <CustomizeEditorButton
        selectionButtonClickHandler={() => {
          props.stopNewLabelPulsing()
          setActiveTab(
            activeTab === CUSTOMIZE_EDITOR_TAB ? null : CUSTOMIZE_EDITOR_TAB
          )
        }} 
      />
      <KeyboardShortcutButton
        selectionButtonClickHandler={() => {
          props.stopNewLabelPulsing()
          setActiveTab(
            activeTab === KEYBOARD_TAB ? null : KEYBOARD_TAB
          )
        }} 
      />
    </Card.Group>
  );

  const langSelectSection = (
    <LanguageSelectSection 
      newLabelPulsing={props.newLabelPulsing}
      languageSelectHandler={props.languageSelectHandler}
    />
  ) 

  const customizeEditorSection = (
    <CustomizeEditorSection 
      formValueHandler={formValueHandler}
      formState={customizeEditorState}
      setState={setState}
      setEditorConfiguration={props.setEditorConfiguration}
    />
  )

  const keyboardShortcuts = (
    <KeyboardShortcutSection/>
  )

  return (
    <Segment style={{background: "#f2f3f5", margin: "6em 15em 3em 15em", borderRadius: "5em"}}>
      <JumbotronHeader/>
      {sectionButtons}
      {activeTab === LANGUAGE_TAB ? langSelectSection : null}
      {activeTab === CUSTOMIZE_EDITOR_TAB ? customizeEditorSection : null}
      {activeTab === KEYBOARD_TAB ? keyboardShortcuts : null}
    </Segment>
  )
}

export default CodePageJumbotron