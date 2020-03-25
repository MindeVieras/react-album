import { SubTranslationObject } from 'react-redux-i18n'

/**
 * Dictionary type will make sure all languages are fully translated.
 */
export type Dictionary = {
  // Redux form fields.
  fields: {
    username: {
      label: string
      required: string
    }
    password: {
      label: string
      required: string
    }
    recaptcha: {
      invalid: string
    }
  }
  // Pages.
  pages: {
    login: {
      title: string
      submit: string
    }
  }
} & SubTranslationObject
