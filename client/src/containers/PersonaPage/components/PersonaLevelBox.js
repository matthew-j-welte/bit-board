import React from 'react'

import { 
  Segment,
  Header,
  Icon,
  Progress
} from 'semantic-ui-react'


const PersonaLevelBox = (props) => (
    <Segment textAlign="center" inverted style={{margin: "0em 21em 0em 21em"}}>
      <Header style={{marginTop: "0em", paddingTop: "0em"}} as='h2' icon textAlign='center'>
        <Icon name='star' inverted/>
        <Header.Content>PERSONA LEVEL</Header.Content>
      </Header>
      <Progress size="big" percent={props.percent} active inverted color="blue" progress>
        Current Lvl: {props.lvl}
      </Progress>
    </Segment>
  )

export default PersonaLevelBox