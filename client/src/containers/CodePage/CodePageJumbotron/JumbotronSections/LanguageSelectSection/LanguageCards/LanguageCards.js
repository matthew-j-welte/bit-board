import React from 'react'
import { Header, Card, Reveal, Image, Label, Transition } from 'semantic-ui-react'
import { languages, statSectionData } from '../mockdata'
import { cardStyle, imgStyle, langCardHeader, newLabelStyle } from './styles'

const LanguageCard = (props) => {
  const statSections = statSectionData.map(statSec => (
    <Header textAlign="center" as='h5' floated="left" style={{marginLeft: "1em", marginTop: "1em"}}>
      <Header.Content>
        {statSec.lvl}
        <Header.Subheader>{statSec.done}/{statSec.total} Completed</Header.Subheader>
      </Header.Content>
    </Header>
  ))
  let newLabel = null
  if (props.new) {
    newLabel = (
      <Transition 
        animation="tada" 
        duration="1500" 
        visible={props.newLabelPulsing}
      >
        <Label 
          circular
          floating
          color='yellow' 
          size="huge"
          content="NEW!"
          style={newLabelStyle}
        />
      </Transition>
    )
  }

  return (
    <Card 
      raised 
      onClick={props.languageSelectHandler} 
      style={cardStyle}
    >
      <Reveal 
        instant 
        animated='fade'
      >
        <Reveal.Content visible>
          <Image 
            fluid
            src={props.logo}  
            style={imgStyle}
          />
          {newLabel}
        </Reveal.Content>
        <Reveal.Content hidden>
          <Header 
            textAlign="center" 
            color={props.color} 
            as="h3" 
            style={langCardHeader}
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