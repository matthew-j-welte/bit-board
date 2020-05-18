import { signupFormConfig } from './config'
import { FormBuilder } from '../../../../utilities/forms/formBuilder'

const SignupForm = (props) => {
  const builder = new FormBuilder(signupFormConfig, props.onChangeHandler)
  return (builder.buildForm())
}

export default SignupForm