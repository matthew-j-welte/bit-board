import React from 'react'
import { Form, Icon, Header, Modal, Button, List } from 'semantic-ui-react'

import { FORM_ENUMS } from './enums'

export class FormBuilder {
  constructor(formConfig, onChangeHandler, formValueHandler, submitTrigger) {
    this.config = formConfig
    this.formName = formConfig.formName
    this.sections = this.extractSectionNames(formConfig)
    this.onChangeHandler = onChangeHandler
    this.formValueHandler = formValueHandler
    this.submitTrigger = submitTrigger
    this.requiredFields = []
  }

  extractSectionNames = (conf) => {
    return Object.keys(conf).filter(k => k !== "formName")
  }

  buildForm = () => {
    const sections = this.sections.map(section => {
      return this._buildSection(section, this.config[section])
    })
    return (
      <Form key={this.formName}>
        {sections}
        {this.submitTrigger}
      </Form>
    ) 
  }

  createStateModel = () => {
    let stateModel = {
      formModel: this.formName
    }
    this.sections.forEach(section => {
      Object.keys(this.config[section].fields).forEach(field => {
        stateModel[field] = this.config[section].fields[field].value || ""
      })
    })
    return stateModel
  }

  _buildSection(name, section) {
    return (
      <div key={name}>
        {this._buildHeader(section.header)}
        {this._buildFormFields(section.fields)}
      </div>
    )
  }

  _buildHeader(header) {
    return (
      <Header color={header.color} as="h3" style={header.style}>
        <Icon name={header.icon}/>
        <Header.Content>
          {header.title}
        </Header.Content>
      </Header>
    )
  }

  _buildFormFields(fields) {
    let builtFields = []
    let inGroup = false
    let groupBeginKey = ""
    let groupFields = []
    Object.keys(fields).forEach(fieldKey => {
      const field = fields[fieldKey]
      if (field.required && !this.requiredFields.includes(fieldKey)) {
        this.requiredFields.push(fieldKey)
      }
      const builtField = this._buildField(fieldKey, field)
      if (field.grouping === FORM_ENUMS.GROUP_BEGIN) {
        inGroup = true
        groupBeginKey = fieldKey
        groupFields.push(builtField)
      }
      else if (field.grouping === FORM_ENUMS.GROUP_END) {
        groupFields.push(builtField)
        inGroup = false
        const groupKey = groupBeginKey + "_" + fieldKey
        builtFields.push(
          <Form.Group key={groupKey} widths="equal">
            {groupFields}
          </Form.Group>
        )
      }
      else if (inGroup) {
        groupFields.push(builtField)
      }
      else {
        builtFields.push(builtField)
      }
    })
    return builtFields
  }

  _buildField(name, field) {
    return (
      <Form.Field
        onChange={(event, data) => this.onChangeHandler(event, data, name)}
        key={name}
        {...field}
        placeholder={field.placeholder ? field.placeholder : field.label}
        content={this.formValueHandler(name)}
      />
    )
  }
}

export const requiredFieldsFromConfig = (config) => {
  const required = []
  const sections = Object.keys(config).filter(k => k !== "formName")
  sections.forEach(section => {
      Object.keys(config[section].fields).forEach(field => {
        if (config[section].fields[field].required) {
          required.push(field)
        }
      })
  })
  return required
}
