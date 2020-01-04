
import FineUploaderS3 from 'fine-uploader-wrappers/s3'

import { baseServerUrl } from 'Helpers'

const allowedExtensions = ['jpeg', 'jpg']

export function mediaUploader(bucket, access_key, allowed = allowedExtensions) {

  return new FineUploaderS3({
    options: {
      request: {
        endpoint: bucket + '.s3.amazonaws.com',
        accessKey: access_key
      },
      signature: {
        endpoint: baseServerUrl + '/api/uploader/sign',
        version: 2
      },
      chunking: {
        enabled: true
      },
      resume: {
        enabled: true
      },
      objectProperties: {
        serverSideEncryption: true,
        key: function(fileId) {
          let name = this.getName(fileId)
          let rand = Math.floor((Math.random() * 9999999) + 1)
          let ext = name.substr(name.lastIndexOf('.') + 1)

          return 'media/'+Date.now().toString()+'-'+rand+'.'+ext.toLowerCase()
        }
      },
      uploadSuccess: {
        endpoint: baseServerUrl + '/api/uploader/success'
      },
      validation: {
        allowedExtensions: allowed,
        stopOnFirstInvalidFile: false
      }
    }
  })
}
