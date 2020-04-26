import React, { Component } from 'react'

import { 
  Grid, 
  Segment,
  Card,
  Icon,
  Image, 
  Header, 
  Container 
} from 'semantic-ui-react'

import axios from 'axios'

import PersonaCoverImage from '../../assets/images/persona-cover.png'
import BookCoverImage from '../../assets/images/book-cover.png'
import DiscoverCoverImage from '../../assets/images/discover-cover.png'

import GoBookLogo from '../../assets/images/DarkGoBook.svg'

const endpoint = "http://localhost:8080"

const AppTopicCard = (props) => (
  <Card raised href="#">
    <Image style={{padding: "1em"}} src={props.coverImage} wrapped ui={false} />
    <Card.Content textAlign="center">
      <Card.Header>{props.header}</Card.Header>
      <Card.Description>
        {props.infoText}
      </Card.Description>
    </Card.Content>
    <Card.Content textAlign="center" extra>
      <a>
        <Icon name={props.icon}/>
        {props.footer}
      </a>
    </Card.Content>
  </Card>
)

const HomepageCenter = (props) => {
  
  
  return  (
    <Container textAlign="center">
      <Image centered size="huge" src={GoBookLogo}/>
      <Card.Group centered stackable itemsPerRow={3}>
        <AppTopicCard 
          coverImage={BookCoverImage}
          header="Bookshelf" 
          infoText="Take a look through your virtual bookshelf - View all of the books you have read or hope to read"
          footer={props.currentBook != null ? "Currently Reading: " + props.currentBook : "Pickup a book today"}
          icon="book"
        />
        <AppTopicCard 
          coverImage={PersonaCoverImage}
          header="Persona" 
          infoText="View and manage your current Persona. By leveling up you can unlock new looks and artifacts for your Persona to showcase to your followers"
          footer={props.personaLvl != null ? "Persona Level: " + props.personaLvl : "Start Leveling Up"}
          icon="exchange"
        />
        <AppTopicCard 
          coverImage={DiscoverCoverImage}
          header="Discover" 
          infoText="Find a new and exciting read by leveraging our compiled recommendations based off of what you like and what your goals are. You can also find books based on a particular persona skill category"
          footer={props.discoverCombinations != null ? "Over " + props.discoverCombinations + " suggestions found!" : "Explore our reccomendations"}
          icon="rocket"
        />
      </Card.Group>
    </Container>
  );
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
      personaLvl: null,
      discoverCombinations: null,
      userId: "100"
    }
  }

  setCardFooterValues = () => {
    const uri = endpoint + "/api/user/" + this.state.userId + "/status"
    axios.get(uri).then(res => {
      if (res.data) {
        this.setState({
          ...res.data
        })
      }
    })
  }

  componentDidMount() {
    this.setCardFooterValues();
  }

  render() {
    return (
      <HomepageCenter {...this.state} />
    )
  }
}

export default HomePage