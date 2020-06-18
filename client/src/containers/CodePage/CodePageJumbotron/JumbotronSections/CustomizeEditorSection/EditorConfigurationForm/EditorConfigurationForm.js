import React from 'react'
import { Segment, Form, Grid, Menu, Divider } from 'semantic-ui-react'

import AceEditor from "react-ace";

import { 
  SAMPLE_CODE, 
  colorThemes, 
  fontSizeOptions, 
  tabSizeOptions 
} from './constants'

const EditorConfigurationMutator = (props) => {
  const themes = colorThemes.map(col => (
    <Menu.Item
        key={col.key}
        name={col.text}
        content={col.text}
        active={props.formState.colorTheme === col.key}
        onClick={() => props.setState({"colorTheme": col.key, "colorThemeUrl": col.url})}
    />  
  ))
      
  return (
    <Segment
      style={{padding: "3em 3em 0 3em", background: "#f7fdff"}}
    >
      <Form.Group widths="equal">
        <Form.Input
          label='Editor Height'
          placeholder='450'
          value={props.formState.editorHeight}
          onChange={(e) => props.formValueHandler("editorHeight", e.target.value)}
        />
        <Form.Dropdown 
          search 
          selection
          label="Font Size" 
          content={props.formState.fontSize}
          value={props.formState.fontSize}
          options={fontSizeOptions}
          onChange={(e, { value }) => props.formValueHandler("fontSize", value)}
        />
        <Form.Dropdown 
          search 
          selection
          label="Tab Size" 
          value={props.formState.tabSize} 
          options={tabSizeOptions}
          onChange={(e, { value }) => props.formValueHandler("tabSize", value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field width={4} style={{marginTop: "2em"}}>
          <label>Color Theme</label>
        </Form.Field>
        <Form.Field width={12} style={{marginTop: "2em"}}>
          <label>Sample Editor</label>
        </Form.Field>
      </Form.Group>
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
          <AceEditor
            mode="golang"
            theme={props.formState.colorThemeUrl ? props.formState.colorThemeUrl: "github"}
            value={SAMPLE_CODE}
            name="UNIQUE_ID"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="300px"
            fontSize={props.formState.fontSize + "px"}
            showPrintMargin={false}
            showGutter={props.formState.hasGutter}
            readOnly
            tabSize={props.formState.tabSize}
            setOptions={{
              behavioursEnabled: false,
              highlightActiveLine: props.formState.highlightLine,
              cursorStyle: "slim",
              showLineNumbers: props.formState.hasLineNumbers
            }}
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
          onChange={() => props.formValueHandler("hasLineNumbers", "CHECKED")}
        />
        <Form.Checkbox 
          label='Show Gutter'
          checked={props.formState.hasGutter}
          onChange={() => props.formValueHandler("hasGutter", "CHECKED")}
        />
        <Form.Checkbox 
          label='Highlight Active Line'
          checked={props.formState.highlightLine}
          onChange={() => props.formValueHandler("highlightLine", "CHECKED")}
        />
      </Form.Group>
      <Divider/>
      <Form.Group>
        <Form.Button color="blue" onClick={() => props.setEditorConfiguration(props.formState)} style={{marginLeft: "-2em", marginTop: "2em"}}>Apply Changes</Form.Button>
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
}

export default EditorConfigurationMutator