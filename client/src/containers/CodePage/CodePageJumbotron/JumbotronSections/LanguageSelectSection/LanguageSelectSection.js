import React from 'react'
import { Segment, Header, Card, Reveal, Image, Label, Transition } from 'semantic-ui-react'

import { languages, statSectionData } from './mockdata'
import SelectionCard from '../components/SelectionCard/SelectionCard'


export const LanguageSelectButton = (props) => (
  <SelectionCard 
    handler={props.selectionButtonClickHandler}
    title="SELECT A LANGUAGE"
    desc="BitBoard currently supports a number of coding languages, each with their own set of unique challenges - ranging from basic problem solving to more advanced architectural based projects"
  />
)


export const LanguageSelectSection = (props) => {
  const statSections = statSectionData.map(statSec => (
      <Header textAlign="center" as='h5' floated="left" style={{marginLeft: "1em", marginTop: "1em"}}>
        <Header.Content>
          {statSec.lvl}
          <Header.Subheader>{statSec.done}/{statSec.total} Completed</Header.Subheader>
        </Header.Content>
      </Header>
  ))

  const bordRad = {"borderRadius": "10em"}
  const languageCards = languages.map(langinfo => {
    let newLabel = null
    let imgStyle ={
      background: "#f2faff", 
      minHeight: "222px", 
      maxHeight: "222px", 
      padding: "2em",
      ...bordRad
    }
    if (langinfo.new) {
      newLabel = (
        <Transition animation="tada" visible={props.newLabelPulsing} duration="1500">
          <Label circular color='yellow' size="huge" floating content="NEW!" style={{"box-shadow": "0 0 20px 5px #d6af13"}}/>
        </Transition>
      )
    }

    return (
      <Card raised style={{minHeight: "225px", ...bordRad, border: "solid #b8b8b8 1px"}} onClick={() => {}}>
        <Reveal instant animated='fade'>
          <Reveal.Content visible>
            <Image 
              fluid
              src={langinfo.logo}  
              style={imgStyle}
            />
            {newLabel}
          </Reveal.Content>
          <Reveal.Content hidden>
            <Header textAlign="center" color={langinfo.color} as="h3" style={{padding : "1em 0em 0em 0em", fontFamily: 'Righteous', borderRadius: "2.5em 2.5em 0 0", marginBottom: "1em"}}>{langinfo.lang}</Header>
            {statSections}
          </Reveal.Content>
        </Reveal>
      </Card>
    )}
  ) 

  return (
    <Segment basic style={{margin: "3em", padding: "2em", borderRadius: "3em"}}>
      <Card.Group itemsPerRow={5}>
        {languageCards}
      </Card.Group>
    </Segment>
  )
}
