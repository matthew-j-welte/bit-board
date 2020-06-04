import React from 'react'
import { Image } from 'semantic-ui-react'

import CppBook from '../../../../assets/images/cpp-book.jpg'
import BookProgressionTable from './ResourceModal/BookProgressionTable/BookProgressionTable'
import LearningResourceCard from './LearningResource'

const BookResourceCard = (props) => {
  const graphicPreview = (
    <Image
      fluid
      style={{maxHeight: "400px", minHeight: "400px"}}
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