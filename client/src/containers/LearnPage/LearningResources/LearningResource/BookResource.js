import React from 'react'
import { Image } from 'semantic-ui-react'

import CppBook from '../../../../assets/images/cpp-book.jpg'
import BookProgressionTable from './ResourceModal/BookProgressionTable/BookProgressionTable'
import LearningResourceCard from './LearningResource'

import * as styles from './styles'

const BookResourceCard = (props) => {
  const graphicPreview = (
    <Image
      fluid
      style={styles.imageStyle}
      src={CppBook}
    />
  )
  const graphic = (
    <BookProgressionTable/>
  )
  return (
    <LearningResourceCard
      graphic={graphic}
      graphicPreview={graphicPreview}
      {...props}
    />
  )
}

export default BookResourceCard