import React from 'react'
import { Image, Header, Divider } from 'semantic-ui-react'

import { headerStyle, headerLogoStyle, headerLowerDividerStyle } from './styles'

const EditorHeader = (props) => (
  <div>
    <Header as='h2' style={headerStyle}>{props.language}</Header>
    <Divider style={headerLowerDividerStyle}/>
  </div>
)

export default EditorHeader;