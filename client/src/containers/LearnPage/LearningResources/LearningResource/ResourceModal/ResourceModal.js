import React, { useState } from 'react'
import TextareaAutosize from "react-textarea-autosize";
import axios from '../../../../../axios'
import { Segment, Modal, Form, Header } from 'semantic-ui-react'

import DescriptionSection from './DescriptionSections/DescriptionSection'
import RationaleSection from './DescriptionSections/RationaleSection'
import SkillWeights from './SkillWeights/SkillWeights'
import ResourceFeed from './ResourceFeed/ResourceFeed'

const ResourceModal = (props) => {
  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat."

  const skills = [{
    name: "Python",
    color: "violet",
    weight: 31
  },
  {
    name: "Artificial Intelligence",
    color: "teal",
    weight: 74
  },
  {
    name: "Operating System",
    color: "pink",
    weight: 7
  },
  {
    name: "Systems Engineering",
    color: "orange",
    weight: 64
  },
  {
    name: "User Interface",
    color: "gold",
    weight: 83
  },
  {
    name: "Communication",
    color: "red",
    weight: 22
  },
  {
    name: "Super Learning",
    color: "pink",
    weight: 37
  }]



  const posts = [{
    img: "joe",
    user: "Joe Henderson",
    daysAgo: 12,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon.",
    likes: 9045
  },
  {
    img: "elliot",
    user: "Elliot Peters",
    daysAgo: 2,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon.",
    likes: 11365
  },
  {
    img: "jenny",
    user: "Jen Pikkey",
    daysAgo: 4,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon.",
    likes: 23540
  },
  {
    img: "justen",
    user: "Justen Randerson",
    daysAgo: 41,
    content: "Ours is a life of constant reruns. We're always circling back to where we'd we started\n, then starting all over again. Even if we don't run extra \n laps that day, we surely will come back for more of the same another day soon.",
    likes: 8402
  }]

  const [newPostValue, setNewPostValue] = useState("")
  
  const newPostHandler = () => {
    console.log("Submitting: ", newPostValue)
    console.log(props)
  }

  return (
    <Modal style={{minHeight: "1800px"}} size="large" dimmer="blurring"
      trigger={props.resourceRow}
    >
      {props.graphic}
      <Segment basic padded="very">
        <DescriptionSection 
          author="Matthew Welte"
          content={content}
        />
        <RationaleSection 
          author="Matthew Welte"
          content={content}
        />
        <SkillWeights skills={skills}/>
        <ResourceFeed posts={posts}/>
        <Form>
          <Header as="h3">New Post</Header>
          <Form.Field>
            <TextareaAutosize 
              label="New Post"
              placeholder='Enlighten us...'
              minRows={10}
              value={newPostValue}
              onChange={event => setNewPostValue(event.target.value)}
            />
          </Form.Field>
          <Form.Button
            content="Submit"
            onClick={() => newPostHandler()}
          />
        </Form>
      </Segment>
    </Modal>
  )
}

export default ResourceModal