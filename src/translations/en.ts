import { Dictionary } from './Dictionary'

const en: Dictionary = {
  // Main menu.
  mainMenu: {
    albums: 'Albums',
    users: 'Users',
    trash: 'Trash',
    logout: 'Logout',
  },
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
    email: {
      label: 'Email',
      invalid: 'Email is invalid',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Login',
    },
    users: {
      title: 'Users',
    },
  },
  // Tooltips.
  tooltip: {
    changeLanguage: 'Change language',
    goFullScreen: 'Go full screen',
    mainMenu: 'Menu',
    filterItemsPerPage: 'Items per page',
    userAdd: 'Add new user',
  },
  // Buttons.
  button: {
    login: 'Login',
    create: 'Create',
    cancel: 'Cancel',
  },
  // Modals.
  modal: {
    userAdd: {
      title: 'Create a new user',
    },
  },
}

export default en
