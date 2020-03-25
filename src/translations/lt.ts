import { Dictionary } from './Dictionary'

const lt: Dictionary = {
  // Redux form fields.
  fields: {
    username: {
      label: 'Vartotojo vardas',
      required: 'Vartotojo vardas yra privalomas',
    },
    password: {
      label: 'Slaptažodis',
      required: 'Slaptažodis yra privalomas',
    },
    recaptcha: {
      invalid: 'Nepatvirtinta reCAPTCHA',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Prisijungti',
      submit: 'Jungtis',
    },
  },
}

export default lt
