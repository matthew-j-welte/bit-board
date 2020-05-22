import React from 'react'

import { 
  Card,
  Icon,
  Container, 
  Header,
  Divider
} from 'semantic-ui-react'

import Project from './Project/Project'

const ProjectGroup = (props) => {
    const projects = props.projects.map(project => (
        <Project
            _id={project._id}
            phase={project.phase}
            name={project.name}
            description={project.description}

        />
    )) 
    
    return (
      <Container style={{marginBottom: "10em"}}>
        <Header as='h1'>
        <Icon name={props.icon} />
        <Header.Content>
          {props.title}
          <Header.Subheader>{props.subheader}</Header.Subheader>
        </Header.Content>
        </Header>
        <Divider/>
        <Card.Group stackable itemsPerRow={4}>
          {projects}
        </Card.Group>
      </Container>
    )
}

export default ProjectGroup