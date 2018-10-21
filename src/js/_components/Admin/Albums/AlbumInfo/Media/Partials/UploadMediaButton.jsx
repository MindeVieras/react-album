
import  React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import CloudUpload from '@material-ui/icons/CloudUpload'

import green from '@material-ui/core/colors/green'

import { Tip } from 'Common'

const styles = theme => ({
  button: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
    position: `fixed`,
    right: theme.spacing.unit * 14,
    bottom: 0,
    margin: theme.spacing.unit,
    zIndex: theme.zIndex.appBar
  }
})

class UploadMediaButton extends Component {

  constructor() {
    super()

    this.state = {
      key: newKey()
    }
  }

  handleClick() {
    this.refs.fileUploader.click()
  }

  onFilesSelected(e) {
    const { uploader } = this.props

    uploader.methods.addFiles(e.target)
    this._resetInput()
  }

  render() {

    const { t } = this.context
    const { classes } = this.props

    return (
      <Fragment>

        <Button
          data-tip
          data-for="tip_upload_media"
          onClick={ () => this.handleClick() }
          variant="fab"
          color="secondary"
          aria-label="upload"
          mini
          className={ classes.button }
        >
          <CloudUpload />
        </Button>
        <Tip id="tip_upload_media">{ t(`Upload media`) }</Tip>

        <input
          multiple={ true }
          ref="fileUploader"
          className="uploader-file-input"
          key={ this.state.key }
          onChange={ (e) => this.onFilesSelected(e) }
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

UploadMediaButton.contextTypes = {
  t: PropTypes.func
}

UploadMediaButton.propTypes = {
  uploader: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UploadMediaButton)
