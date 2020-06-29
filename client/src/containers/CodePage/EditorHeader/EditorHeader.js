import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

import * as styles from './styles'

const EditorHeader = (props) => (
  <div>
    <Header as='h2' style={styles.headerStyle}>{props.language}</Header>
    <Divider style={styles.headerLowerDividerStyle}/>
  </div>
)

export default EditorHeader;