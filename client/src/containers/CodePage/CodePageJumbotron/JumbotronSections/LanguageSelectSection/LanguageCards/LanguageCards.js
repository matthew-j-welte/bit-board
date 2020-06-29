import React from 'react'
import { Header, Card, Reveal, Image } from 'semantic-ui-react'
import { languages, statSectionData } from '../mockdata'
import * as styles from './styles'

const LanguageCard = (props) => {
  const statSections = statSectionData.map(statSec => (
    <Header textAlign="center" as='h5' floated="left" style={styles.headerStyle}>
      <Header.Content>
        {statSec.lvl}
        <Header.Subheader>{statSec.done}/{statSec.total} Completed</Header.Subheader>
      </Header.Content>
    </Header>
  ))

  return (
    <Card 
      raised 
      onClick={() => props.languageSelectHandler(props.lang)} 
      style={styles.cardStyle}
    >
      <Reveal 
        instant 
        animated='fade'
      >
        <Reveal.Content visible>
          <Image 
            fluid
            src={props.logo}  
            style={styles.imgStyle}
          />
        </Reveal.Content>
        <Reveal.Content hidden>
          <Header 
            textAlign="center" 
            color={props.color} 
            as="h3" 
            style={styles.langCardHeader}
            content={props.lang}
          />
          {statSections}
        </Reveal.Content>
      </Reveal>
    </Card>
  )
}


const LanguageCards = (props) => (
  languages.map(langinfo => (
    <LanguageCard 
      newLabelPulsing={props.newLabelPulsing}
      languageSelectHandler={props.languageSelectHandler}
      {...langinfo}
    />
  )) 
)

export default LanguageCards