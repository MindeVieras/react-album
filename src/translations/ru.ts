import { Dictionary } from './Dictionary'

const ru: Dictionary = {
  // Redux form fields.
  fields: {
    username: {
      label: 'Имя пользователя',
      required: 'Имя пользователя требуется',
    },
    password: {
      label: 'Пароль',
      required: 'Необходим пароль',
    },
    recaptcha: {
      invalid: 'Не удается проверить reCAPTCHA',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Войти в систему',
      submit: 'Войти',
    },
  },
}

export default ru
