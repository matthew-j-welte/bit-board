import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-coffee";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/ext-language_tools"

const languageToModeMapping = {
  "Python": "python",
  "Golang": "golang",
  "Javascript": "javascript",
  "C#": "csharp",
  "C++": "c_cpp",
  "Java": "java",
  "Coffeescript": "coffee",
  "MySQL": "mysql",
  "Ruby": "ruby"
}

const toLowerDictionary = (conf) => {
  let newConf = {}
  Object.keys(conf).forEach(confKey => {
    const oldKey = confKey
    newConf[confKey.toLowerCase()] = conf[oldKey]
  })
  return newConf
}

const MainEditorPane = (props) => {
  const editorConf = toLowerDictionary(props.editorConfiguration)
  console.log(editorConf)
  return (
      <Form>
        <AceEditor
          mode={languageToModeMapping[props.activeLanguage] ? languageToModeMapping[props.activeLanguage] : "golang"}
          theme={editorConf.colorthemeurl ? editorConf.colorthemeurl : "dracula"}
          value={props.activeFileContents}
          onChange={props.codeInputHandler}
          name="UNIQUE_ID"
          editorProps={{ $blockScrolling: true }}
          width="96%"
          height={editorConf.editorheight ? editorConf.editorheight + "px" : "600px"}
          fontSize={editorConf.fontsize}
          tabSize={editorConf.tabsize}
          showPrintMargin={false}
          showGutter={editorConf.hasgutter}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: editorConf.haslinenumbers,
            highlightActiveLine: editorConf.highlightline
          }}
        />
        <Button 
          circular
          color="yellow"
          onClick={props.codeSubmitHandler}
          content="Submit Code"
          floated="right"
          style={{
            width: "40%",
            margin: "1em 3em 0em 0em"
          }}
        />
      </Form>
  )
}

export default MainEditorPane