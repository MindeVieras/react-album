
import  React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import CloudUpload from '@material-ui/icons/CloudUpload'

import green from '@material-ui/core/colors/green'

import { albumsActions } from '../../../_actions'

const styles = theme => ({
  button: {
    position: `fixed`,
    right: theme.spacing.unit * 14,
    bottom: 0,
    margin: theme.spacing.unit,
    zIndex: theme.zIndex.appBar,
    color: theme.palette.common.white,
    backgroundColor: green[500]
  }
})

class UploadMedia extends Component {

  constructor() {
    super()

    this.state = {
      key: newKey()
    }

    this._onFilesSelected = onFilesSelected.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.refs.fileUploader.click()
  }

  render() {

    const { t } = this.context
    const { uploader, classes } = this.props

    return (
      <Fragment>
        <Tooltip
          id="tooltip_upload_media"
          title={ t(`Upload media`) }
          enterDelay={ 500 }
        >
          <Button
            onClick={ () => this.handleClick() }
            variant="fab"
            color="secondary"
            aria-label="upload"
            mini
            className={ classes.button }
          >
            <CloudUpload />
          </Button>
        </Tooltip>
        <input
          multiple={ true }
          ref="fileUploader"
          className="uploader-file-input"
          key={ this.state.key }
          onChange={ this._onFilesSelected }
          style={{display: 'none'}}
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

const onFilesSelected = onChangeEvent => {
  const { uploader } = this.props
  uploader.methods.addFiles(onChangeEvent.target)
  this._resetInput()
}

const newKey = () => Date.now()

UploadMedia.contextTypes = {
  t: PropTypes.func
}

UploadMedia.propTypes = {
  uploader: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(UploadMedia))
