import React from 'react'
import { List } from 'semantic-ui-react'

import LanguageChoice from './LanguageChoice/LanguageChoice'
import { languageChoices } from './constants'

const LanguageExplorer = (props) => {
  const languages = languageChoices.map(lang => (
    <LanguageChoice
      key={lang.language}
      isItemActive={props.activeLanguage === lang.language}
      clickHandler={props.languageSelectHandler}
      {...lang}
    />
  ))

  return (
    <List 
      inverted 
      selection 
      verticalAlign='middle' 
      size="huge"
    >
      {languages}
    </List>
  )
}

export default LanguageExplorer;