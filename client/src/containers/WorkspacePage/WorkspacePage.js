import React, { Component } from 'react'

import { 
  Card,
  Icon,
  Image, 
  Container, 
  Header,
  Divider,
  Segment
} from 'semantic-ui-react'

import axios from '../../axios'

import ColorCloudBkg from '../../assets/images/color-cloud.png'

const phaseToColorMap = {
  Development: "#f3ffde",
  Production: "#f1e6fa",
  Drafting: "#f3ffde",
  Published: "#f1e6fa"
}

const ProjectGroup = (props) => (
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
      {props.cards}
    </Card.Group>
  </Container>
)

class WorkspacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "1828dec38879419fad0ce23fe1323fa4",
      projectCount: 0,
      projects: []
    }
  }

  getProjects = () => {
    const uri = "/api/user/" + this.state.userId + "/workspace/projects"
    axios.get(uri).then(res => {
      if (res.data) {
        console.log(res.data)
        console.log([...res.data.slice()])
        this.setState({
          projects: [...res.data.slice()]
        })
      }
    })

  }

  componentDidMount() {
    this.getProjects();
  }

  render() {
    let codeProjects = [];
    let writingProjects = [];
    this.state.projects.forEach((project) => {
      const card = (
        <Card 
          key={project._id} 
          raised 
          href="#"
          style={{borderStyle:"ridge", borderColor: phaseToColorMap[project.phase], borderRadius: "2em"}} 
        >
          <Card.Content textAlign="center">
            <Card.Header>{project.title}</Card.Header>
          </Card.Content>
          <Image src={ColorCloudBkg} wrapped ui={false} />
          <Card.Content textAlign="center">
            <Card.Description>
              {project.description}
            </Card.Description>
          </Card.Content>
          <Card.Content  
            extra
            textAlign="center"
            style={{margin: ".25em 0em 1.75em 0em", background: phaseToColorMap[project.phase]}}
          >
            <Icon name="caret right"/>
            <strong style={{color: "black"}}>{project.phase}</strong>
            <Icon name="caret left"/>
          </Card.Content>
        </Card>
      );
      if (project.type == "Code") {
        codeProjects.push(card)
      }
      else if(project.type == "Writing") {
        writingProjects.push(card)
      }
    });

    return (
      <Container style={{marginTop: "5em"}} >
        <ProjectGroup
          title="Software Development Projects"
          subheader="Manage your Code"
          icon="code branch"
          cards={codeProjects}
        />
        <ProjectGroup
          title="Writing Projects"
          subheader="Review your Writing"
          icon="pencil"
          cards={writingProjects}
        />
      </Container>
    )
  }
}

export default WorkspacePage