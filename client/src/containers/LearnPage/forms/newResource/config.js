import { Input, Select, TextArea } from 'semantic-ui-react'

const softwareCategories = [
  { key: 'sysEng', text: 'Systems Engineering', value: 'sysEng' },
  { key: 'webDev', text: 'Web Development', value: 'webDev' },
  { key: 'embedded', text: 'Embedded Software', value: 'embedded' },
  { key: 'ai', text: 'Artificial Intelligence', value: 'ai' },
  { key: 'sci', text: 'Science / Mathematics Software', value: 'sci' }
]

const resourceForm = (type, icon) => {
  const upperLabel = type.charAt(0).toUpperCase() + type.slice(1)
  return {
    suggestion: {
      header: {
        title: upperLabel + " Suggestion",
        icon: icon,
        color: "blue",
        style: {margin: "25px 0px 25px 0px"}
      },
      fields: {
        resourceURL: {
          control: Input,
          label: upperLabel + " URL",
          required: true
        },
        resourceDesc: {
          control: TextArea,
          label: upperLabel + " Description",
          placeholder: "Give a brief description of this resource in your own words",
          required: true
        },
        resourceRationale: {
          control: TextArea,
          label: "Rationale",
          placeholder: "Provide a valid reason why you believe this resource will be beneficial to the BitBoard Community",
          required: true
        },
        resourceCategory: {
          control: Select,
          options: softwareCategories,
          label: "Category",
          required: true
        }
      }
    }
  }
}

export const vidFormConfig = resourceForm("video", "video")
export const bookFormConfig = resourceForm("book", "book")
export const articleFormConfig = resourceForm("article", "newspaper outline")
