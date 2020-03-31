import ISO6391 from 'iso-639-1'

import { translations } from '../translations'

/**
 * Available language details.
 */
interface IAvailableLanguage {
  code: string
  name: string
  nativeName: string
}

/**
 * Localization class.
 */
export class Locale {
  /**
   * Default fallback locale/language code.
   */
  private static fallbackCode: string = 'en'

  /**
   * Gets saved language code from local storage.
   *
   * @returns {string}
   *   Language code.
   */
  public static getLocalLanguage(): string {
    return localStorage.getItem('language') ?? Locale.getBrowserLanguageCode()
  }

  /**
   * Sets language code to local storage.
   *
   * @param {string} code
   *   Language code.
   */
  public static setLocalLanguage(code: string = Locale.fallbackCode): void {
    localStorage.setItem('language', code)
  }

  /**
   * Get language iso-639-1 code form locale code.
   *
   * @param {string}
   *   Locale code.
   *
   * @returns {string}
   *   Language code.
   */
  public static getLanguageCodeFromLocaleCode(code: string): string {
    return code.split('-')[0] ?? Locale.fallbackCode
  }

  /**
   * Gets browser locale code.
   * Will fallback to 'en'.
   *
   * @returns {string}
   *   locale code like: en, en-US, es, ru...
   */
  public static getBrowserLocaleCode = (): string => {
    let lang: string
    if (window.navigator.languages && window.navigator.languages.length) {
      // Latest versions of Chrome and Firefox set this correctly.
      lang = window.navigator.languages[0]
    } else if (window.navigator.userLanguage) {
      // IE only.
      lang = window.navigator.userLanguage
    } else if (window.navigator.language) {
      // Latest versions of Chrome, Firefox, and Safari set this correctly.
      lang = window.navigator.language
    } else {
      // Fallback.
      lang = Locale.fallbackCode
    }

    return lang
  }

  /**
   * Gets browser language code.
   *
   * @returns {string}
   *   Language code like: en, es, ru...
   */
  public static getBrowserLanguageCode = (): string => {
    return Locale.getLanguageCodeFromLocaleCode(Locale.getBrowserLocaleCode())
  }

  /**
   * Gets currently available translatable languages.
   *
   * @returns {IAvailableLanguage[]}
   *   Detailed list of available languages.
   */
  public static getAvailableLanguages = (): IAvailableLanguage[] => {
    return Object.keys(translations).map((l) => {
      return {
        code: l,
        name: ISO6391.getName(l),
        nativeName: ISO6391.getNativeName(l),
      }
    })
  }

  /**
   * Gets complete list of languages.
   *
   * @returns
   */
  public static getAllLanguages = (): any => {
    return ISO6391.getAllCodes()
  }
}
