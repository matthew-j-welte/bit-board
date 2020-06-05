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

  const [newPostValue, setNewPostValue] = useState("")
  const newPostHandler = () => {
    console.log("Posting!")
    const uri = "/api/learn/resource/" + props.id + "/new/post"
    axios.post(
      uri, 
      {
        "content": newPostValue,
        "userID": "5ed964f0c37059ec434292ec"
      },
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      })
    .then(res => {
      if (res.data) {
        console.log("Successfully posted new resource post")
        console.log(res.data)
      }
    })
    .catch(err => {
      console.log("Failed!", err)
    })
  }

  const postFieldIncrementHandler = (postID, field) => {
    const uri = `/api/learn/resource/${props.id}/post/${postID}/increment/${field}`
    axios.put(uri, null,
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }
    )
  }
  console.log(props)

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
        <ResourceFeed 
          posts={props.posts}  
          postFieldIncrementHandler={postFieldIncrementHandler}/>
        <Form style={{marginTop: "3em"}}>
          <Header as="h3">New Post</Header>
          <Form.Field>
            <TextareaAutosize
              style={{whiteSpace: "pre-wrap"}}
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