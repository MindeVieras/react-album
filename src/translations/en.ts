import { Dictionary } from './Dictionary'

const en: Dictionary = {
  // Redux form fields.
  fields: {
    username: {
      label: 'Username',
      required: 'Username is required',
    },
    password: {
      label: 'Password',
      required: 'Password is required',
    },
    recaptcha: {
      invalid: 'Cannot validate reCAPTCHA',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Login',
      submit: 'Login',
    },
  },
}

export default en
