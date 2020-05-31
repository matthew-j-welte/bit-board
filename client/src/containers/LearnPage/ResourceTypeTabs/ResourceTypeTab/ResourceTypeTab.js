import React from 'react'
import { Menu, Icon, Segment, Grid, Feed, Item, Modal, Label } from 'semantic-ui-react'

import { FormBuilder } from '../../../../utilities/forms/formBuilder'

const ResourceTypeTab = (props) => {
    const formBuilder = new FormBuilder(
        props.formConfig,
        props.handleFormFieldChange,
        props.queryFormState,
        newResourceSuggestionSubmitHandler
    )
    const newResourceSuggestionForm = formBuilder.buildForm()

    const triggerButton = (
        <Label
            as="a"
            size="small"
            circular
            style={{marginTop: "6px"}}
            onClick={() => props.initializeNewResourceFormState(formBuilder)}
        >
            Suggest {props.title} Resource
        </Label>
    )
        
    const newResourcePrompt = (
      <Modal trigger={triggerButton}>
        <Modal.Header>Create New Resource</Modal.Header>
        <Modal.Content>
          {newResourceSuggestionForm}
        </Modal.Content>
      </Modal>
    )
  
    return (
      <Menu.Item
        name={props.key}
        active={props.activeResourceTypeTab === props.key}
        onClick={props.menuTabSelectionHandler}
      >
        <Icon name={props.icon} />
          {props.title}
          {newResourcePrompt}
      </Menu.Item>
    )
}

export default ResourceTypeTab