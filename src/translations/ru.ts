import { Dictionary } from './Dictionary'

const ru: Dictionary = {
  // Main menu.
  mainMenu: {
    albums: 'Альбомы',
    users: 'Пользователей',
    trash: 'Корзина',
    logout: 'Выйти',
  },
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
    email: {
      label: 'Электронная почта',
      invalid: 'E-mail неверен',
    },
    displayName: {
      label: 'Показать имя',
    },
    role: {
      label: 'Роль',
    },
    locale: {
      label: 'Место действия',
    },
    status: {
      label: 'Статус',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Войти в систему',
    },
    albums: {
      title: 'Альбомы',
    },
    users: {
      title: 'Пользователей',
    },
    trash: {
      title: 'Корзина',
    },
  },
  // Tooltips.
  tooltip: {
    changeLanguage: 'Изменение языка',
    goFullScreen: 'Перейти на полный экран',
    mainMenu: 'Меню',
    filterItemsPerPage: 'Пункты на странице',
    userAdd: 'Добавить нового пользователя',
    userEdit: 'Редактировать пользователя',
    userDelete: 'Удалить пользователя',
  },
  // Buttons.
  button: {
    login: 'Войти',
    create: 'Создайте',
    cancel: 'Отмена',
  },
  // Modals.
  modal: {
    userAdd: {
      title: 'Создать нового пользователя',
    },
    userEdit: {
      title: 'Редактировать \'%{username}\'',
    },
    userDelete: {
      title: 'Вы уверены, что удалите \'%{username}\'?',
      content: 'Это действие не может быть отменено!',
      ok: 'Да',
      cancel: 'Нет',
    },
  },
}

export default ru
