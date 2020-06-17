import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/ext-language_tools"

const MainEditorPane = (props) => {
  return (
      <Form>
        <AceEditor
          mode="golang"
          theme="dracula"
          value={props.activeFileContents}
          onChange={props.codeInputHandler}
          name="UNIQUE_ID"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="750px"
          fontSize="14px"
          showPrintMargin={false}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
        />
        <Button.Group attached='bottom'>
          <Button primary onClick={props.codeSubmitHandler}>SUBMIT</Button>
          <Button.Or/>
          <Button onClick={props.codeClearHandler}>CLEAR ALL</Button>
        </Button.Group>
      </Form>
  )
}

export default MainEditorPane