import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import { config } from './config'
import { authHeader } from '.'

export function mediaUploader() {
  return new FineUploaderS3({
    options: {
      request: {
        endpoint: `${config.aws.bucket}.s3.amazonaws.com`,
        accessKey: config.aws.accessKey,
      },
      signature: {
        endpoint: `${config.baseServerUrl}/api/uploader/sign`,
        customHeaders: authHeader(),
        version: 4,
      },
      chunking: {
        enabled: true,
      },
      resume: {
        enabled: true,
      },
      objectProperties: {
        serverSideEncryption: true,
        region: config.aws.region,
        bucket: config.aws.bucket,
        key: function (fileId) {
          // console.log(this)
          // @ts-ignore
          let name = this.getName(fileId)
          let rand = Math.floor(Math.random() * 9999999 + 1)
          let ext = name.substr(name.lastIndexOf('.') + 1)

          return `media/${Date.now().toString()}-${rand}.${ext.toLowerCase()}`
        },
      },
      uploadSuccess: {
        endpoint: `${config.baseServerUrl}/api/uploader/success`,
        customHeaders: authHeader(),
      },
      validation: {
        allowedExtensions: ['jpeg', 'jpg'],
        stopOnFirstInvalidFile: false,
      },
    },
  })
}
