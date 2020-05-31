import React from 'react'
import { Menu, Icon, Modal, Label } from 'semantic-ui-react'

import { FormBuilder } from '../../../../utilities/forms/formBuilder'

const ResourceTypeTab = (props) => {
    const formBuilder = new FormBuilder(
        props.formConfig,
        props.handleFormFieldChange,
        props.queryFormState,
        props.newResourceSuggestionSubmitHandler
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
        name={props.componentKey}
        active={props.activeResourceTypeTab === props.componentKey}
        onClick={() => props.menuTabSelectionHandler(props.componentKey)}
      >
        <Icon name={props.icon} />
          {props.title}
          {newResourcePrompt}
      </Menu.Item>
    )
}

export default ResourceTypeTab