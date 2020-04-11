/**
 * App configuration object from environmental variables.
 */
export const config = {
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  baseServerUrl: process.env.REACT_APP_BASE_URL!,
  recaptchaSiteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY!,
  aws: {
    bucket: process.env.REACT_APP_AWS_BUCKET!,
    accessKey: process.env.REACT_APP_AWS_ACCESS_KEY!,
  },
}
