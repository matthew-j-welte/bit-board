import React from 'react'

import { 
  Grid,
  Segment,
  Header,
  Icon,
  Progress,
  Divider,
  Container
} from 'semantic-ui-react'

const skillTypeToColor = {
    Software: {
      0: "blue",
      1: "teal"
    },
    "Soft Skills": {
      0: "violet",
      1: "purple"
    }
  }
  
getSkillColorShade = (percent, cat) => {
    const shades = skillTypeToColor[cat]
    if (percent < 50) {
      return [shades[0], false]
    }
    return [shades[1], true]
  }
  
const SkillBar = (props) => {
    skills = props.skills.map(skill => {
    let shade, _active
      [shade, _active] = getSkillColorShade(skill.percent, skill.category)
      return (
        <Container key={skill._id}>
          <Divider/>
          <Progress 
            active={_active}
            style={{marginTop: "2em"}} 
            percent={skill.percent} 
            inverted 
            color={shade} 
            progress
          >
            {skill.name}
          </Progress>
        </Container>
      )
    });
  
    return (
      <Grid.Column>
        <Segment inverted style={{minHeight: "700px"}}>
          <Header as='h2' icon textAlign='center'>
            <Icon name={props.icon} circular />
            <Header.Content>{props.header}</Header.Content>
          </Header>
          <Divider/>
          {skills}
        </Segment>
      </Grid.Column>
    )
  }

export default SkillBar