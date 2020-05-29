import React from 'react'
import { Header } from 'semantic-ui-react'
import { textStyle } from './styles'

const UserCountHeader = (props) => (
  <Header
    inverted
    as='h3'
    content={"Over " + props.userCount + " users and counting!"}
    style={textStyle}
    />
)

export default UserCountHeader