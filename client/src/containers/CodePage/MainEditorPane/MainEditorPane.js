import React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { editorTextAreaStyle } from './styles'

const MainEditorPane = (props) => {


  return (
  <Form>
    <Form.TextArea 
      onChange={props.codeInputHandler}
      value={props.activeFileContents}
      style={editorTextAreaStyle}
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