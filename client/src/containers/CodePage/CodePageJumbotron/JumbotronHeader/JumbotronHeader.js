import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

const JumbotronHeader = () => (
  <div>
    <Header 
      textAlign="center" 
      color="blue"
      style={{
        fontSize: "5em", 
        fontFamily: 'Righteous',
        marginTop: ".2em",
        "text-shadow": "0 0 12px grey"
      }}
    >
      WELCOME TO BITBOARD CODE EDITOR
    </Header>
    <Divider/>
  </div>
)

export default JumbotronHeader