import { Input, Select, TextArea } from 'semantic-ui-react'
import { FORM_ENUMS } from '../../../../utilities/forms/enums'

const projTypes = [
  { key: 's', text: 'Software', value: 'software' },
  { key: 'w', text: 'Writing', value: 'writing' },
]

const phaseTypes = [
  { key: 'dr', text: 'Drafting', value: 'drafting' },
  { key: 'wr', text: 'Writing', value: 'writing' },
  { key: 'pub', text: 'Published', value: 'published' },
  { key: 'pln', text: 'Planning', value: 'planning' },
  { key: 'dev', text: 'Development', value: 'development' },
  { key: 'rel', text: 'Released', value: 'released' },
]

export const newProjectConfig = {
  projSection: {
    header: {
      title: "Project Info",
      icon: "folder",
      color: "blue",
      style: {margin: "25px 0px 25px 0px"}
    },
    fields: {
      projName: {
        control: Input,
        label: "Project Name",
        required: true
      },
      projType: {
        grouping: FORM_ENUMS.GROUP_BEGIN,
        control: Select,
        options: projTypes,
        label: "Project Type",
        required: true
      },
      projPhase: {
        grouping: FORM_ENUMS.GROUP_END,
        control: Select,
        options: phaseTypes,
        label: "Current Phase",
        required: true
      },
      projDescription: {
        control: TextArea,
        label: "Project Description",
        placeholder: "Give a brief summary of your project"
      },
      url: {
        control: Input,
        label: "URL",
      },
    }
  }
}