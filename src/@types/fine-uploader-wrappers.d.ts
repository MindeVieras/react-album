declare module 'fine-uploader-wrappers/s3' {
  import { FineUploaderBasic } from 'fine-uploader/lib/core'
  import { s3 } from 'fine-uploader/lib/s3'

  export default class FineUploaderS3 extends FineUploaderBasic {
    constructor({}: { options: s3.S3UIOptions })

    options: s3.S3UIOptions
    methods: s3.FineUploader
    qq: any

    on(eventName: string, callBackFunction: Function): void
    off(eventName: string, callBackFunction: Function): void
  }
}
