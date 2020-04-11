import React, { Component, Fragment } from 'react'
import { Button } from 'antd'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'

import { Tip } from './Tip'

interface IUploadMediaButtonProps {
  uploader: FineUploaderS3
}

export class UploadMediaButton extends Component<IUploadMediaButtonProps> {
  constructor(props: IUploadMediaButtonProps) {
    super(props)

    this.state = {
      key: newKey(),
    }
  }

  handleClick() {
    // @ts-ignore
    this.refs.fileUploader.click()
  }

  onFilesSelected(e: any) {
    const { uploader } = this.props
    uploader.methods.addFiles(e.target)
    this._resetInput()
  }

  render() {
    return (
      <Fragment>
        <Button
          data-tip
          data-for="tip_upload_media"
          onClick={() => this.handleClick()}
          aria-label="upload"
        >
          Upload
        </Button>
        <Tip id="tip_upload_media">Upload media</Tip>

        <input
          multiple={true}
          ref="fileUploader"
          className="uploader-file-input"
          // @ts-ignore
          key={this.state.key}
          onChange={(e) => this.onFilesSelected(e)}
          style={{ display: 'none' }}
          name="file"
          type="file"
        />
      </Fragment>
    )
  }

  _resetInput() {
    this.setState({ key: newKey() })
  }
}

const newKey = () => Date.now()
