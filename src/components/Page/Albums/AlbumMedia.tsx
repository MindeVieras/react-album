import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'

import { UploadMediaButton } from '../../Ui'
import { IMediaProps } from '../../../services/MediaService'

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
  media?: IMediaProps[]
}

const AlbumMedia: FunctionComponent<IAlbumMediaProps> = ({ albumId, media }) => {
  // uploader: FineUploaderS3
  // _onStatusChange: OnStatusChange
  // _onComplete: OnComplete

  // constructor(props: IAlbumMediaProps) {
  //   super(props)
  // }

  // render() {
  // const { t } = this.context
  // const { classes, files, wrapper_width, wrapper_height, isLightboxOpen } = this.props
  // const { media } = this.props

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
  // console.log(albumId)
  return (
    <div>
      Dropzone goes here
      {media?.map((m) => (
        <div key={m.id}>{m.name}</div>
      ))}
      <UploadMediaButton />
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
