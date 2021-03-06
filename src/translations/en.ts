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
    displayName: {
      label: 'Display name',
    },
    role: {
      label: 'Role',
    },
    locale: {
      label: 'Locale',
    },
    status: {
      label: 'Status',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Login',
    },
    albums: {
      title: 'Albums',
    },
    users: {
      title: 'Users',
    },
    trash: {
      title: 'Trash',
    },
  },
  // Tooltips.
  tooltip: {
    changeLanguage: 'Change language',
    goFullScreen: 'Go full screen',
    mainMenu: 'Menu',
    filterItemsPerPage: 'Items per page',
    userAdd: 'Add new user',
    userEdit: 'Edit user',
    userDelete: 'Delete user',
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
    userEdit: {
      title: 'Edit \'%{username}\'',
    },
    userDelete: {
      title: 'Are you sure delete \'%{username}\'?',
      content: 'This action cannot be undone!',
      ok: 'Yes',
      cancel: 'No',
    },
  },
}

export default en
