import React from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { mainSegmentBoxStyle, sorryHeaderStyle } from './styles'

const ErrorPage = () => (
  <Segment style={mainSegmentBoxStyle}>
    <Header textAlign="center" style={sorryHeaderStyle}>
      SORRY!
    </Header>
    <Header textAlign="center">
      Something went wrong on our end - a bug report has been submitted
    </Header>
    <Header textAlign="center">
      <Link to="/">
        <Icon loading name="bug"/>Back To Safety <Icon loading name="bug"/>
      </Link>
    </Header>
  </Segment>
);

export default ErrorPage