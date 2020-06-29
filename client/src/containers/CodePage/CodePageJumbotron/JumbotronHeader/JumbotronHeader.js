import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

import { headerStyle } from './styles'

const JumbotronHeader = () => (
  <div>
    <Header 
      textAlign="center" 
      color="blue"
      style={headerStyle}
    >
      WELCOME TO BITBOARD CODE EDITOR
    </Header>
    <Divider/>
  </div>
)

export default JumbotronHeader