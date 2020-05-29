import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Carousel from './Carousel/Carousel'
import { slideData } from './constants'

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