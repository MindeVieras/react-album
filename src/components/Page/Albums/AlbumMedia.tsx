import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mediaUploader } from '../../../helpers'
import { UploadMediaButton } from '../../Ui'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import { OnStatusChange, OnComplete } from 'fine-uploader/lib/core'

// import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

// import CloudUpload from '@material-ui/icons/CloudUpload'

// import grey from '@material-ui/core/colors/grey'

// import Dropzone from './Partials/Dropzone'
// import TotalProgressBar from './Partials/TotalProgressBar'
// import UploadMediaButton from './Partials/UploadMediaButton'

// import MediaList from './MediaList'
// import LightboxSlider from './LightboxSlider'

// import { mediaUploader } from 'Helpers'
// import { albumsActions } from 'Actions'

// const styles = (theme) => ({
//   dz_wrapper: {
//     flex: 1,
//     display: `flex`,
//   },
//   dz_wrapper_active: {
//     backgroundColor: grey[900],
//   },
//   empty_text_wrapper: {
//     flex: 1,
//     display: `flex`,
//     justifyContent: `center`,
//     alignItems: `center`,
//   },
//   empty_text: {
//     display: `flex`,
//     alignItems: `center`,
//     color: grey[600],
//   },
//   empty_text_icon: {
//     fontSize: 52,
//     marginRight: theme.spacing.unit * 2,
//   },
// })

interface IAlbumMediaProps {
  albumId: string
}

class AlbumMedia extends Component<IAlbumMediaProps> {
  uploader: FineUploaderS3
  _onStatusChange: OnStatusChange
  _onComplete: OnComplete

  constructor(props: IAlbumMediaProps) {
    super(props)

    this.uploader = mediaUploader()
    console.log(this.uploader)

    const uploader = this.uploader
    const statusEnum = uploader.qq.status

    this._onStatusChange = (id, oldStatus, status) => {
      // Submitting files
      if (status === statusEnum.SUBMITTED) {
        const { albumId } = this.props
        const { size, type } = uploader.methods.getFile(id)

        // Set additional params to S3 upload success.
        let s3params = {
          filesize: size,
          mime: type,
          albumId,
          status,
        }
        uploader.methods.setUploadSuccessParams(s3params, id)

        // console.log(name)
        // props.dispatch(albumsActions.submitMedia(id, status, false))
        // Set media data
        // const data = { filename: name, size, mime: type }
        // props.dispatch(albumsActions.setMediaData(id, data))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        // props.dispatch(albumsActions.setMediaPhase(id, status))
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      console.log(responseJSON)
      // const { dispatch } = this.props
      // const { media_id, mime } = responseJSON.data
      // dispatch(albumsActions.setMediaMediaId(id, media_id))
      // dispatch(albumsActions.saveMediaMetadata(id, media_id))
      // dispatch(albumsActions.saveRekognitionLabels(id, media_id))
      // dispatch(albumsActions.saveRekognitionText(id, media_id))
      // // // If IMAGE
      // if (mime.includes('image')) {
      //   dispatch(albumsActions.generateImageThumbs(id, media_id))
      //   dispatch(albumsActions.saveRekognitionText(id, media_id))
      // }
      // // If VIDEO
      // else if (mime.includes('video')) {
      //   dispatch(albumsActions.generateVideos(id, media_id))
      // }
    }
  }

  componentDidMount() {
    const uploader = this.uploader
    uploader.on('statusChange', this._onStatusChange)
    uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    const uploader = this.uploader
    uploader.off('statusChange', this._onStatusChange)
    uploader.off('complete', this._onComplete)
  }

  render() {
    // const { t } = this.context
    // const { classes, files, wrapper_width, wrapper_height, isLightboxOpen } = this.props

    const uploader = this.uploader

    // // Remove/Add dropzone text and fileField if any visableFiles
    // let uploaderContent = ''

    // if (files.length > 0)
    //   uploaderContent = (
    //     <MediaList
    //       files={files}
    //       uploader={uploader}
    //       wrapper_width={wrapper_width}
    //       wrapper_height={wrapper_height}
    //     />
    //   )
    // else
    //   uploaderContent = (
    //     <div className={classes.empty_text_wrapper}>
    //       <Typography className={classes.empty_text} variant="h2">
    //         <CloudUpload className={classes.empty_text_icon} /> {t('Drop files here')}
    //       </Typography>
    //     </div>
    //   )

    return (
      <div>
        Dropzone goes here
        <UploadMediaButton uploader={uploader} />
      </div>
      //   {/* Dropzone with all uploaded files */}
      //   <Dropzone
      //     uploader={uploader}
      //     multiple={true}
      //     className={classes.dz_wrapper}
      //     dropActiveClassName={classes.dz_wrapper_active}
      //   >
      //     {/* Media items */}
      //     {uploaderContent}
      //   </Dropzone>
    )
  }
}

// Media.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   classes: PropTypes.object.isRequired,
//   bucket: PropTypes.string.isRequired,
//   access_key: PropTypes.string.isRequired,
//   entity: PropTypes.number.isRequired,
//   entity_id: PropTypes.number.isRequired,
//   status: PropTypes.number.isRequired,
//   files: PropTypes.array.isRequired,
//   isLightboxOpen: PropTypes.bool.isRequired,
//   wrapper_width: PropTypes.number,
//   wrapper_height: PropTypes.number,
// }

// Media.defaultProps = {
//   wrapper_width: 500,
//   wrapper_height: 600,
// }

// Media.contextTypes = {
//   t: PropTypes.func,
// }

// function mapStateToProps(state) {
//   const { settings, admin_ui } = state
//   return {
//     bucket: settings.app.bucket,
//     access_key: settings.app.access_key_id,
//     isLightboxOpen: admin_ui.lightbox.isOpen,
//   }
// }

export default connect()(AlbumMedia)
