import FineUploaderS3 from 'fine-uploader-wrappers/s3'

declare global {
  interface Window {
    uploader: FineUploaderS3
  }
}
