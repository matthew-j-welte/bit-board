import React from 'react'
import { Form, Icon, Header } from 'semantic-ui-react'

import { FORM_ENUMS } from './enums'

export class FormBuilder {
  constructor(formConfig, onChangeHandler, formValueHandler) {
    this.config = formConfig
    this.formName = formConfig.formName
    delete this.config.formName
    this.sections = Object.keys(formConfig)
    this.onChangeHandler = onChangeHandler
    this.formValueHandler = formValueHandler
  }

  buildForm = () => {
    const sections = this.sections.map(section => {
      return this._buildSection(section, this.config[section])
    })
    return (
      <Form key={this.formName}>
        {sections}
        <Form.Button style={{margin: "10px 0px 0px 0px"}}>Submit</Form.Button>
      </Form>
    ) 
  }

  static createStateModel = (formConfig) => {
    let stateModel = {
      formModel: this.formName
    }
    const sections = Object.keys(formConfig)
    sections.forEach(section => {
      Object.keys(formConfig[section].fields).forEach(field => {
        stateModel[field] = formConfig[section].fields[field].value || ""
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
