import { Dictionary } from './Dictionary'

const lt: Dictionary = {
  // Main menu.
  mainMenu: {
    albums: 'Albumai',
    users: 'Vartotojai',
    trash: 'Šiukšliadėžė',
    logout: 'Atsijungti',
  },
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
    email: {
      label: 'Elektroninis paštas',
      invalid: 'El. Pašto adresas neteisingas',
    },
    displayName: {
      label: 'Rodomasis vardas',
    },
    role: {
      label: 'Vaidmuo',
    },
    locale: {
      label: 'Lokalė',
    },
    status: {
      label: 'Statusas',
    },
  },
  // Pages.
  pages: {
    login: {
      title: 'Prisijungti',
    },
    users: {
      title: 'Vartotojai',
    },
  },
  // Tooltips.
  tooltip: {
    changeLanguage: 'Pakeisti kalbą',
    goFullScreen: 'Eiti per visą ekraną',
    mainMenu: 'Meniu',
    filterItemsPerPage: 'Elementų puslapyje',
    userAdd: 'Pridėti naują vartotoją',
    userEdit: 'Redaguoti vartotoją',
  },
  // Buttons.
  button: {
    login: 'Jungtis',
    create: 'Sukurti',
    cancel: 'Atšaukti',
  },
  // Modals.
  modal: {
    userAdd: {
      title: 'Sukurkite naują vartotoją',
    },
    userEdit: {
      title: 'Radaguoti \'%{username}\'',
    },
  },
}

export default lt
