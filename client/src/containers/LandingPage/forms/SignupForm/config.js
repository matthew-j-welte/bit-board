import { Input, Select, TextArea } from 'semantic-ui-react'
import { FORM_ENUMS } from '../../../../utilities/forms/enums'

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]


const headerConstants = {
  color: "blue",
  style: {margin: "50px 0px 25px 0px"}
}

export const signupFormConfig = {
  userInfoSection: {
    header: {
      title: "User Info",
      icon: "user",
      ...headerConstants,
      style: {margin: "25px 0px 25px 0px"}
    },
    fields: {
      fname: {
        grouping: FORM_ENUMS.GROUP_BEGIN,
        control: Input,
        label: "First Name",
        required: true
      },
      lname: {
        control: Input,
        label: "Last Name",
        required: true
      },
      gender: {
        grouping: FORM_ENUMS.GROUP_END,
        control: Select,
        options: genderOptions,
        label: "Gender",
        required: true
      },
      username: {
        control: Input,
        label: "Username",
        required: true
      },
      email: {
        control: Input,
        label: "Email",
        placeholder: "hello@world.com",
        required: true
      },
      password: {
        control: Input,
        label: "Password",
        type: "password",
        required: true
      }
    }
  },
  technicalInfoSection: {
    header: {
      title: "Technical Information",
      icon: "code",
      ...headerConstants
    },
    fields: {
      techTitle: {
        grouping: FORM_ENUMS.GROUP_BEGIN,
        control: Input,
        label: "Preffered Title"
      },
      techExperience: {
        grouping: FORM_ENUMS.GROUP_END,
        control: Input,
        label: "Years Experience",
        placeholder: "25"
      },
      techSummary: {
        control: TextArea,
        label: "Professional Summary",
        placeholder: "Give a brief summary of your professional/recreational software experience"
      },
    }
  },
  workInfoSection: {
    header: {
      title: "Work Experience",
      icon: "briefcase",
      ...headerConstants
    },
    fields: {
      jobTitle: {
        grouping: FORM_ENUMS.GROUP_BEGIN,
        control: Input,
        label: "Job Title"
      },
      yearsWorking: {
        grouping: FORM_ENUMS.GROUP_END,
        control: Input,
        label: "Years Working",
        placeholder: "5"
      },
      companyName: {
        control: Input,
        label: "Company Name"
      },
      jobRole: {
        control: TextArea,
        label: "Job Role",
        placeholder: "Brief summary of the work you perform - and your daily responsibilities"
      },
    }
  }
}