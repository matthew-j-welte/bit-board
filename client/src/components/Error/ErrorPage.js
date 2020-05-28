import React from 'react'

import { Segment, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ErrorPage = (props) => (
  <Segment style={{margin: "5em 10em 5em 10em"}}>
    <Header textAlign="center" style={{fontSize: "15em"}}>
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