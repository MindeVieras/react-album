/**
 * App configuration object from environmental variables.
 */
export const config = {
  baseServerUrl: process.env.REACT_APP_BASE_URL!,
  recaptchaSiteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY!,
}
