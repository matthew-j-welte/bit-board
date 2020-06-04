import React from 'react'
import { Embed, Image } from 'semantic-ui-react'

import ColorCloudBkg from '../../../../assets/images/color-cloud.png'
import LearningResourceCard from './LearningResource'

const VideoResourceCard = (props) => (
  <LearningResourceCard
    graphicPreview={
      <Image
        // fluid
        style={{maxHeight: "400px", minHeight: "400px"}}
        src={ColorCloudBkg}
      />
    }
    graphic={
      <Embed
        id={props.videoId}
        placeholder={ColorCloudBkg}
        source="youtube"
      />
    }
    {...props}
  />
)

export default VideoResourceCard
