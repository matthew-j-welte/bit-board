import React from 'react'
import { List } from 'semantic-ui-react'

import FileChoice from './FileChoice/FileChoice'

const FileExplorer = (props) => {
  const files = Object.keys(props.currentCode).map(file => (
    <FileChoice
      key={file}
      isItemActive={props.activeFile === file}
      clickHandler={props.fileClickHandler}
      filename={file}
    />
  ))

  return (
    <List  
      selection 
      verticalAlign='middle' 
      size="small"
    >
      {files}
    </List>
  )
}

export default FileExplorer