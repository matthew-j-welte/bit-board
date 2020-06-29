import React from 'react'
import { Segment, Form, Divider } from 'semantic-ui-react'

import SelectionCard from '../components/SelectionCard/SelectionCard'
import EditorConfigurationForm from './EditorConfigurationForm/EditorConfigurationForm'

import * as styles from './styles'

const MINUS = "-"
const PLUS = "+"

export const CustomizeEditorButton = (props) => (
  <SelectionCard 
    activeTab={props.activeTab}  
    handler={props.selectionButtonClickHandler}
    title="CUSTOMIZE YOUR EDITOR"
    desc="Bitboard allows a lot of opportunity to customize your editor the way you prefer. Once you find the style you like you can save the 'theme' and come back and use it later."
  />
)


export const CustomizeEditorSection = (props) => {
  const configurationMutatorSection = (
    <EditorConfigurationForm
      {...props}
    />
  )

  const savedEditorConfOptions = props.savedEditorConfigurations.map(
    configuration => ({
        key: configuration._id, 
        value: configuration._id, 
        text: configuration.name
      }
    )
  )

  return (
    <Segment 
      basic 
      style={styles.segmentStyle}
    >
      <Form>
        <Form.Group style={styles.formGroupStyle}>
          <Form.Button 
            fluid
            active={props.formState.newConfigurationOpen} 
            width={4}
            label="New Configuration"
            onClick={() => props.formValueHandler("newConfigurationOpen", !props.formState.newConfigurationOpen)}
          >
              {PLUS}
            </Form.Button>
          <Form.Dropdown 
            search 
            selection
            label="Saved Configurations" 
            placeholder="None" 
            width={8}
            options={savedEditorConfOptions}
            onChange={(e, { value }) => props.setEditorConfigurationFromID(value)}
            style={styles.formDropdownStyle}
          />
          <Form.Button 
            fluid 
            width={4} 
            label="Edit Saved Configuration" 
            disabled={props.formState.selectedSavedConfiguration ? false : true}
          >
            {MINUS}
          </Form.Button>
        </Form.Group>
        <Divider/>
        {props.formState.newConfigurationOpen ? configurationMutatorSection : null}
      </Form>
    </Segment>
  )
}
