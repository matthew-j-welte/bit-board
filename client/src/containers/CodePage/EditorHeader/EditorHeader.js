import React from 'react'
import { Image, Header, Divider } from 'semantic-ui-react'

import { headerStyle, headerLogoStyle, headerLowerDividerStyle } from './styles'

const EditorHeader = (props) => (
  <div>
    <Header 
      inverted 
      as='h2'
      style={headerStyle}
    >
      <Image 
        circular 
        src={props.icon}
        style={headerLogoStyle}
      />
        {props.language}
    </Header>
    <Divider inverted style={headerLowerDividerStyle}/>
  </div>
)

export default EditorHeader;