import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Segment } from 'semantic-ui-react'

import CodePagePreview from '../../assets/images/code-background.png'
import PersonaPagePreview from '../../assets/images/statistics-image.jpg'
import LearningPagePreview from '../../assets/images/learning-network.jpg'
import WorkspacePagePreview from '../../assets/images/cloud-image.jpg'

import Carousel from './carousel/Carousel'

const slideData = [
  {
    index: 0,
    headline: 'CODE',
    button: 'Start Coding',
    src: CodePagePreview,
    desc: "Begin coding in Bitboards integrated development environment. Challenged range from finding the most efficient solution to an algorithmic problem to architecting full mini projects to achieve a more realistic real world feel",
    path: "/code"
  },
  {
    index: 1,
    headline: 'LEVEL UP',
    button: 'View Persona Stats',
    src: PersonaPagePreview,
    desc: "View all of the progress you have made thus far through your time spent coding, learning and networking. You can view the different skills you've acquired and a number of other helpful statistics to track your progress as a BitBoard developer",
    path: "/persona"
  },
  {
    index: 2,
    headline: 'LEARN',
    button: 'Expand Your Knowledge',
    src: LearningPagePreview,
    desc: "Dive into a number of helpful learning resources that will help you become a more well rounded developer. Resources range from suggested Text, posted articles, and helpful videos. ",
    path: "/learn"
  },
  {
    index: 3,
    headline: 'MANAGE',
    button: 'Browse Your Repos',
    src: WorkspacePagePreview,
    desc: "Manage all of the active or completed projects you have worked. Here you can manage not only your development projects, but also any writing projects you happen to be working. Track the stage of development for each project",
    path: "/workspace"
  }
]

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
      personaLvl: null,
      discoverCombinations: null,
    }
  }

  render() {
    return (
      <Segment basic style={{marginTop: "6em"}}>
        <Carousel heading="Bitboard Routing" slides={slideData} slideLength={slideData.length}/>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(HomePage)