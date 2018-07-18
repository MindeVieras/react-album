
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import ReactTooltip from 'react-tooltip'
import { toastr } from 'react-redux-toastr'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import CloudUpload from '@material-ui/icons/CloudUpload'

import grey from '@material-ui/core/colors/grey'

import Dropzone from './Partials/dropzone'
import TotalProgressBar from './Partials/total-progress-bar'

import MediaList from './MediaList'
import UploadMedia from '../../../Buttons/UploadMedia'

import { authHeader, baseServerUrl } from '../../../../../_helpers'
import { footerActions, albumsActions } from '../../../../../_actions'
import { mediaService } from '../../../../../_services'

const styles = theme => ({
  dz_wrapper: {
    flex: 1,
    display: `flex`
  },
  empty_text_wrapper: {
    flex: 1,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  empty_text: {
    display: `flex`,
    alignItems: `center`,
    color: grey[600]
  },
  empty_text_icon: {
    fontSize: 52,
    marginRight: theme.spacing.unit * 2
  }
})

class Media extends Component {

  constructor(props) {
    super(props)

    this.uploader = new FineUploaderS3({
      options: {
        request: {
          endpoint: props.bucket+'.s3.amazonaws.com',
          accessKey: props.access_key
        },
        signature: {
          endpoint: baseServerUrl+'/api/uploader/sign',
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
          endpoint: baseServerUrl+'/api/uploader/success'
        }
      }

    })

    const uploader = this.uploader
    const statusEnum = uploader.qq.status

    this._onStatusChange = (id, oldStatus, status) => {
      // Submitting files
      if (status === statusEnum.SUBMITTED) {
        const { entity, entity_id, status } = this.props
        const { name, size, type } = uploader.methods.getFile(id)
        // Set exptra filesize and mime type to S3 upload success
        let s3params = {
          filesize: size,
          mime: type,
          entity,
          entity_id,
          status
        }
        uploader.methods.setUploadSuccessParams(s3params, id)

        props.dispatch(albumsActions.submitMedia(id, status, false))
        // Set media data
        const data = { filename: name, size, mime: type }
        props.dispatch(albumsActions.setMediaData(id, data))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        props.dispatch(albumsActions.setMediaPhase(id, status))
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      const { dispatch } = this.props
      const { media_id, s3_key, mime } = responseJSON.data

      dispatch(albumsActions.setMediaMediaId(id, media_id))
      dispatch(albumsActions.saveMediaMetadata(id, media_id))
      dispatch(albumsActions.saveRekognitionLabels(id, media_id))

      // If IMAGE
      if (mime.includes('image')) {
        dispatch(albumsActions.generateImageThumbs(id, media_id))
      }
      // If VIDEO
      else if (mime.includes('video')) {
        dispatch(albumsActions.generateVideos(id, s3_key))
      }
    }

  }

  componentDidMount() {
    const uploader = this.uploader
    // const { dispatch } = this.props

    // // Set footer upload input button
    // dispatch(footerActions.buttonRemove('uploadMedia'))
    // let buttonProps = {
    //   uploader
    // }
    // dispatch(footerActions.buttonSet('', 'uploadMedia', 'info', buttonProps))

    uploader.on('statusChange', this._onStatusChange)
    uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
    this.uploader.off('complete', this._onComplete)
  }

  render() {

    const { t } = this.context
    const {
      classes, entity, entity_id,
      status, files,
      wrapper_width, wrapper_height,
      dispatch
    } = this.props

    const uploader = this.uploader

    // Remove/Add dropzone text and fileField if any visableFiles
    let uploaderText = ''

    if (files.length > 0)
      uploaderText = <span/>

    else
      uploaderText = <div className={ classes.empty_text_wrapper }>
        <Typography
          className={ classes.empty_text }
          variant="display2"
        >
          <CloudUpload className={ classes.empty_text_icon } /> { t('Drop files here') }
        </Typography>
      </div>

    return (
      <Fragment>
        <Dropzone
          uploader={ uploader }
          multiple={ true }
          className={ classes.dz_wrapper }
        >
          <TotalProgressBar
            uploader={ uploader }
          />

          <MediaList
            files={ files }
            uploader={ uploader }
            wrapper_width={ wrapper_width }
            wrapper_height={ wrapper_height }
          />

          { uploaderText }

        </Dropzone>

        <UploadMedia
          uploader={ uploader }
        />

      </Fragment>
    )
  }
}

Media.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  bucket: PropTypes.string.isRequired,
  access_key: PropTypes.string.isRequired,
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  files: PropTypes.array.isRequired,
  wrapper_width: PropTypes.number,
  wrapper_height: PropTypes.number
}

Media.defaultProps = {
  wrapper_width: 500,
  wrapper_height: 600
}

Media.contextTypes = {
  t: PropTypes.func
}

function mapStateToProps(state) {
  const { settings } = state
  return {
    bucket: settings.app.s3_bucket,
    access_key: settings.app.access_key_id
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Media))
