import { SubTranslationObject } from 'react-redux-i18n'

/**
 * Dictionary type will make sure all languages are fully translated.
 */
export type Dictionary = {
  // Main menu.
  mainMenu: {
    albums: string
    users: string
    trash: string
    logout: string
  }
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
    email: {
      label: string
      invalid: string
    }
    displayName: {
      label: string
    }
    role: {
      label: string
    }
    locale: {
      label: string
    }
    status: {
      label: string
    }
  }
  // Pages.
  pages: {
    login: {
      title: string
    }
    albums: {
      title: string
    }
    users: {
      title: string
    }
    trash: {
      title: string
    }
  }
  // Tooltips.
  tooltip: {
    changeLanguage: string
    goFullScreen: string
    mainMenu: string
    filterItemsPerPage: string
    userAdd: string
    userEdit: string
    userDelete: string
  }
  // Buttons.
  button: {
    login: string
    create: string
    cancel: string
  }
  // Modals.
  modal: {
    userAdd: {
      title: string
    }
    userEdit: {
      title: string
    }
    userDelete: {
      title: string
      content: string
      ok: string
      cancel: string
    }
  }
} & SubTranslationObject
