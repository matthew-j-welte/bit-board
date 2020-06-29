import React from 'react'
import { Embed, Image } from 'semantic-ui-react'

import LearningResourceCard from './LearningResource'

import * as styles from './styles'

const VideoResourceCard = (props) => (
  <LearningResourceCard
    graphicPreview={
      <Image
        style={styles.imageStyle}
        src={props.image}
      />
    }
    graphic={
      <Embed
        id={props.videoId}
        placeholder={props.image}
        source="youtube"
      />
    }
    {...props}
  />
)

export default VideoResourceCard
