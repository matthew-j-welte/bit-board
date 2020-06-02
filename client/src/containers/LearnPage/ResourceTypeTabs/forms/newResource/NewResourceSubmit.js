import React from 'react'
import { Modal, Button, List, Header, Loader } from 'semantic-ui-react'

const LoadingModal = (props) => {
  return (
    <Modal 
      size='small'
      open={props.submissionConfirmationModalOpen}
    >
      <Loader size='massive'>Attempting Submission</Loader>
    </Modal>
  )  
}

const SubmissionModal = (props) => {
  return (
    <Modal
      size='small'
      trigger={props.submitButton}
      open={props.submissionConfirmationModalOpen}
    > 
      {props.header}
      {props.content}
      <Modal.Actions>
        <Button icon='check' content='Done' onClick={() => props.submissionConfirmationModalStateChange()} />
      </Modal.Actions>
    </Modal>
  )  
}

const SuccessfulSubmissionModal = (props) => {
  const headerStyle = {background: "#deffe7", fontSize: "2em", color: "green"}
  const header = <Modal.Header textAlign="center" style={headerStyle}>Success</Modal.Header>
  const content = (
    <Modal.Content>
      <Header textAlign="center" as="h3">THANKS FOR YOUR SUGGESTION!</Header>
      <Header 
        as="h4" 
        style={{marginBottom: "2em"}}
      >
        Your suggestion will now be put through the standard BitBoard review process:
      </Header>
      <List bulleted relaxed="very">
        <List.Item>The resource you submitted will be reviewed by other users of BitBoard.</List.Item>
        <List.Item>Suggested skills will be added/removed/tweaked as the consensus sees fit.</List.Item>
        <List.Item>If the resource is valuable enough to share with the BitBoard community - it will be featured on the LearnPage.</List.Item>
      </List>
    </Modal.Content>
  )
  return (
    <SubmissionModal
      submitButton={props.submitButton}
      header={header}
      content={content}
      {...props}
    />
  )
}

const FailedSubmissionModal = (props) => {
  const headerStyle = {background: "#ffe9e8", fontSize: "2em", color: "#7a0400"}
  const header = <Modal.Header style={headerStyle}>Error</Modal.Header>
  const content = (
    <Modal.Content>
      <p>
        Something went wrong when trying to process your resource suggestion - please
        try again later
      </p>
    </Modal.Content>
  )
  return (
    <SubmissionModal
      submitButton={props.submitButton}
      header={header}
      content={content}
      {...props}
    />
  )
}

const NewResourceSubmit = (props) => {
  const submitButton = (
    <Button 
      style={{margin: "10px 0px 0px 0px"}}
      disabled={!props.formSatisfied}
      onClick={() => props.newResourceSuggestionSubmitHandler()}
    >
      Submit
    </Button>
  )
  console.log(props)
  if (props.awaitingPost) {
    console.log("Loading Modal")
    return (
      <LoadingModal {...props}/>
    )  
  }
  if (props.failedPosting) {
    console.log("Failed Modal")
    return (
      <FailedSubmissionModal
        submitButton={submitButton}
        {...props}
      />
    )  
  }
  console.log("Success Modal")
  return (
    <SuccessfulSubmissionModal
      submitButton={submitButton}
      {...props}
    />
  )  
}

export default NewResourceSubmit