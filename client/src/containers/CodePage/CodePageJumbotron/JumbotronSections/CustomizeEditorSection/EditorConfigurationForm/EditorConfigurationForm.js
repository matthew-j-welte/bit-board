import React from 'react'
import { Segment, Form, Grid, Menu, Divider } from 'semantic-ui-react'

import AceEditor from "react-ace";

import { 
  SAMPLE_CODE, 
  colorThemes, 
  fontSizeOptions, 
  tabSizeOptions 
} from './constants'

import * as styles from './styles'

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
      style={styles.mainSegment}
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
        <Form.Field width={4} style={styles.themeSubHeader}>
          <label>Color Theme</label>
        </Form.Field>
        <Form.Field width={12} style={styles.themeSubHeader}>
          <label>Sample Editor</label>
        </Form.Field>
      </Form.Group>
      <Segment>
        <Grid>
          <Grid.Column 
            width={4} 
            style={styles.themeColumn}
          >
            <Menu 
              color="blue"
              pointing 
              fluid 
              vertical
              style={styles.themeMenu}
            >
              {themes}
            </Menu>
          </Grid.Column>
          <Grid.Column 
            stretched 
            width={12} 
            style={styles.themeColumn}
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
      <Form.Field style={styles.extraConfSubHeader}>
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
        <Form.Button color="blue" onClick={() => props.setEditorConfiguration(props.formState)} style={styles.applyChangesButton}>Apply Changes</Form.Button>
        <Form.Input 
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'save',
            content: 'Save Current Configuration As: ',
            onClick: () => props.submitNewEditorConfiguration(props.formState)
          }}
          actionPosition='left'
          placeholder="Configuration Name..."
          value={props.formState.configurationName}
          onChange={(e) => props.formValueHandler("configurationName", e.target.value)}
          style={styles.saveAsBox}
        />
      </Form.Group>
    </Segment>
  )
}

export default EditorConfigurationMutator