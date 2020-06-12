import React, { useState } from 'react'
import TextareaAutosize from "react-textarea-autosize";
import axios from '../../../../../axios'
import { Segment, Modal, Form, Header } from 'semantic-ui-react'

import DescriptionSection from './DescriptionSections/DescriptionSection'
import SkillWeights from './SkillWeights/SkillWeights'
import ResourceFeed from './ResourceFeed/ResourceFeed'

const ResourceModal = (props) => {
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
  const [newPostSubmitted, handlePostSubmission] = useState(false)
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

  const postFieldIncrementHandler = (postID, field, increment) => {
    const action = increment ? "increment" : "decrement"
    const uri = `/api/learn/resource/${props.id}/post/${postID}/${action}/${field}` 
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
          content={props.description}
        />
        <SkillWeights skills={skills}/>
        <ResourceFeed 
          posts={props.posts}  
          postFieldIncrementHandler={postFieldIncrementHandler}/>
        <Form style={{marginTop: "3em"}}>
          <Header as="h3">{newPostSubmitted ? "Thanks for your Submission!" : "New Post"}</Header>
          <Form.Field>
            <TextareaAutosize
              style={{whiteSpace: "pre-wrap", background: newPostSubmitted ? "#c1e6f5": ""}}
              disabled={newPostSubmitted}
              readOnly={newPostSubmitted}
              label={newPostSubmitted ? "Thanks for your Submission!" : "New Post"}
              placeholder='Enlighten us...'
              minRows={10}
              value={newPostValue}
              onChange={event => setNewPostValue(event.target.value)}
            />
          </Form.Field>
          <Form.Button
            color={newPostSubmitted ? "teal" : "green"}
            content={newPostSubmitted ? "Edit" : "Submit"}
            onClick={() => {
              newPostHandler()
              handlePostSubmission(!newPostSubmitted)
            }}
          />
        </Form>
      </Segment>
    </Modal>
  )
}

export default ResourceModal