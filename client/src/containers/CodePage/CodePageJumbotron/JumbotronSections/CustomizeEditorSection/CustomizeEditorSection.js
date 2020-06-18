import React from 'react'
import { Segment, Form, Divider } from 'semantic-ui-react'

import SelectionCard from '../components/SelectionCard/SelectionCard'
import EditorConfigurationForm from './EditorConfigurationForm/EditorConfigurationForm'

export const CustomizeEditorButton = (props) => (
  <SelectionCard 
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

  return (
    <Segment 
      basic 
      style={{margin: "3em", padding: "2em", borderRadius: "3em"}}
    >
      <Form>
        <Form.Group style={{marginBottom: "-2em"}}>
          <Form.Button 
            fluid
            active={props.formState.newConfigurationOpen} 
            width={4}
            label="New Configuration"
            onClick={() => props.formValueHandler("newConfigurationOpen", !props.formState.newConfigurationOpen)}
          >
              +
            </Form.Button>
          <Form.Dropdown 
            search 
            selection
            label="Saved Configurations" 
            placeholder="None" 
            width={8}
            options={[]}
            style={{marginBottom: "2em"}}
          />
          <Form.Button width={4} fluid label="Edit Saved Configuration" disabled={props.formState.selectedSavedConfiguration ? false : true}>
            -
          </Form.Button>
        </Form.Group>
        <Divider/>
        {props.formState.newConfigurationOpen ? configurationMutatorSection : null}
      </Form>
    </Segment>
  )
}
