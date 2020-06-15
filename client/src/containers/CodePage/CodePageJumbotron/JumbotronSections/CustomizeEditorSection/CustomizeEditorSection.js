import React from 'react'
import { Segment, Input, Form, Image, Grid, Menu, Label, Divider } from 'semantic-ui-react'
import _ from 'lodash'

import SelectionCard from '../components/SelectionCard/SelectionCard'
import draculaSample from '../../../../../assets/images/theme-snapshots/dracula-sample.png'

const fontSizeOptions = _.range(8, 25).map(num => ({
  key: num, value: num, text: num
}))

const tabSizeOptions = _.range(2, 9, 2).map(num => ({
  key: num, value: num, text: num
}))

const colorThemes = [
  {key: "0", value: "0", text: "Dark - Dracula Theme"},
  {key: "1", value: "1", text: "Dark - Monokai"},
  {key: "2", value: "2", text: "Dark - Github"},
  {key: "3", value: "3", text: "Dark - Solarized Dark"},
  {key: "4", value: "4", text: "Light - Solarized Light"},
  {key: "5", value: "5", text: "Dark - Tomorrow Night"},
  {key: "6", value: "6", text: "Dark - Tomorrow Night Blue"},
  {key: "7", value: "7", text: "Dark - Tomorrow Night Eighties"},
  {key: "8", value: "8", text: "Dark - Tomorrow Night Eighties"},
  {key: "9", value: "9", text: "Dark - Tomorrow Night Eighties"},
  {key: "10", value: "10", text: "Dark - Tomorrow Night Eighties"},
  {key: "11", value: "11", text: "Dark - Tomorrow Night Eighties"},
  {key: "12", value: "12", text: "Dark - Tomorrow Night Eighties"}
]  

export const CustomizeEditorButton = (props) => (
  <SelectionCard 
    handler={props.selectionButtonClickHandler}
    title="CUSTOMIZE YOUR EDITOR"
    desc="Bitboard allows a lot of opportunity to customize your editor the way you prefer. Once you find the style you like you can save the 'theme' and come back and use it later."
  />
)


export const CustomizeEditorSection = (props) => {
  const themes = colorThemes.map(col => (
    <Menu.Item
      key={col.key}
      as="option"
      name={col.text}
      active={props.formState.colorTheme === col.key}
      onClick={() => props.setState("colorTheme", col.key)}
    />
  ))


  const editConfigurationSection = (
    <Segment
      style={{padding: "3em 3em 0 3em", background: "#f7fdff"}}
    >
      <Form.Group widths="equal">
        <Form.Input
          label='Editor Height'
          placeholder='450'
          value={props.formState.editorHeight}
          onChange={(e) => props.setState("editorHeight", e.target.value)}
        />
        <Form.Dropdown 
          search 
          selection
          label="Font Size" 
          content={props.formState.fontSize}
          value={props.formState.fontSize}
          options={fontSizeOptions}
          onChange={(e, { value }) => props.setState("fontSize", value)}
        />
        <Form.Dropdown 
          search 
          selection
          label="Tab Size" 
          value={props.formState.tabSize} 
          options={tabSizeOptions}
          onChange={(e, { value }) => props.setState("tabSize", value)}
        />
      </Form.Group>
      <Form.Field style={{marginTop: "2em"}}>
        <label>Color Theme</label>
      </Form.Field>
      <Segment>
        <Grid>
          <Grid.Column 
            width={4} 
            style={{padding: "0"}}
          >
            <Menu 
              color="blue"
              pointing 
              fluid 
              vertical
              style={{
                height: "300px", 
                background: "white", 
                padding: "0",
                "overflow-y": "scroll", 
                "overflow-x": "hidden", 
              }}
            >
              {themes}
            </Menu>
          </Grid.Column>
          <Grid.Column 
            stretched 
            width={12} 
            style={{padding: "0"}}
          >
            <Image 
              centered 
              fluid 
              rounded 
              src={draculaSample}
            />
          </Grid.Column>
        </Grid>            
      </Segment>
      <Form.Field style={{marginTop: "3em"}}>
        <label>Extra Configuration</label>
      </Form.Field>
      <Divider/>
      <Form.Group>
        <Form.Checkbox 
          label='Show Line Numbers'
          checked={props.formState.hasLineNumbers}
          onChange={() => props.setState("hasLineNumbers", "CHECKED")}
        />
        <Form.Checkbox 
          label='Show Gutter'
          checked={props.formState.hasGutter}
          onChange={() => props.setState("hasGutter", "CHECKED")}
        />
        <Form.Checkbox 
          label='Highlight Active Line'
          checked={props.formState.highlightLine}
          onChange={() => props.setState("highlightLine", "CHECKED")}
        />
      </Form.Group>
      <Divider/>
      <Form.Group>
        <Form.Button color="blue" style={{marginLeft: "-2em", marginTop: "2em"}}>Apply Changes</Form.Button>
        {/* <Form.Button color="teal" style={{marginTop: "2em"}}>Save Current Configuration</Form.Button> */}
        <Form.Input 
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'save',
            content: 'Save Current Configuration As: ',
          }}
          actionPosition='left'
          placeholder="Configuration Name..."
          style={{marginTop: "2em", width: "300px"}}
        />
      </Form.Group>
    </Segment>
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
            onClick={() => props.setState("newConfigurationOpen", !props.formState.newConfigurationOpen)}
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
        {props.formState.newConfigurationOpen ? editConfigurationSection : null}
      </Form>
    </Segment>
  )
}
