import React, { FunctionComponent, Fragment, useRef } from 'react'
import { Button } from 'antd'

import { Tip } from './Tip'

/**
 * Upload media button input component.
 *
 * @returns {FunctionComponent<IUploadMediaButtonProps>}
 *   Functional 'UploadMediaButton' component.
 */
export const UploadMediaButton: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Trigger hidden file input.
  const handleClick = () => {
    inputRef.current?.click()
  }

  // Hidden input on change event handler.
  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      // Add files to the uploader.
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          const file = files[key]
          window.uploader.addFile({ data: file, name: file.name, type: file.type })
        }
      }
    }
  }

  return (
    <Fragment>
      <Button data-tip data-for="tip_upload_media" onClick={handleClick} aria-label="upload">
        Upload
      </Button>
      {/* <Tip id="tip_upload_media">Upload media</Tip> */}
      {/* <Tip>Upload media</Tip> */}

      <input
        multiple={true}
        ref={inputRef}
        className="uploader-file-input"
        onChange={onFilesSelected}
        style={{ display: 'none' }}
        name="media"
        type="file"
      />
    </Fragment>
  )
}
