import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'
import Uppy, { UppyFile } from '@uppy/core'
import AwsS3Multipart from '@uppy/aws-s3-multipart'

import { PrivateRoute, LoginPage, AlbumsPage, TrashPage, Error404 } from './components'
import UsersPage from './components/Page/Users/UsersPage'

import { history, Ui, config } from './helpers'
import { setUiDimensions, mediaSubmit, mediaSetProgress, mediaCreate } from './actions'
import { IStoreState, IAlbumSelectedProps } from './reducers'
import { IMediaSubmitProps, MediaItem, IMediaCreateValues } from './services'
import { MediaSubmitStatus } from './enums'

interface IAppProps {
  appTitle?: string
  appName: string
  setUiDimensions: Function
  selectedAlbum?: IAlbumSelectedProps
  mediaSubmit: (data: IMediaSubmitProps) => void
  mediaSetProgress: (id: MediaItem['id'], progress: number) => void
  mediaCreate: (id: IMediaSubmitProps['id'], values: IMediaCreateValues) => void
}

interface IAppState {
  selectedAlbumId?: string
}

interface IProgress {
  bytesTotal: number
  bytesUploaded: number
}

interface IMediaFileMeta {
  album?: IMediaSubmitProps['album']
}

interface IMediaUploadResponse {
  uploadURL: string
}

/**
 * This is main App component.
 *
 * @module App
 */
class App extends Component<IAppProps, IAppState> {
  updateDimensions: () => void
  uploaderOnFileAdded: (file: UppyFile) => void
  uploaderOnUploadProgress: (file: UppyFile, progress: IProgress) => void
  uploaderOnUploadSuccess: (file: UppyFile<IMediaFileMeta>, response: IMediaUploadResponse) => void

  /**
   * Initialize the App.
   *
   * @param {IAppProps} props
   *   Props to pass.
   */
  constructor(props: IAppProps) {
    super(props)

    // Load all fonts.
    WebFont.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900'],
      },
    })

    this.state = {
      selectedAlbumId: Ui.getLocalSelectedAlbum(),
    }

    // Set initial UI dimensions.
    props.setUiDimensions()

    // Update state with new dimensions.
    this.updateDimensions = () => {
      props.setUiDimensions()
    }

    // Set media uploader as global window object.
    window.uploader = Uppy({
      autoProceed: true,
    })

    window.uploader.use(AwsS3Multipart, {
      limit: 4,
      companionUrl: `${config.baseServerUrl}/api/uploader`,
    })

    /**
     * Fired each time a file is added.
     *
     * @param {UppyFile} file
     *   Uppy file object.
     */
    this.uploaderOnFileAdded = (file) => {
      const { id, size, type, name } = file
      if (type) {
        // Set media data.
        const data: IMediaSubmitProps = {
          isUppy: true,
          id,
          status: MediaSubmitStatus.added,
          size,
          mime: type,
          name,
          progress: 0,
          album: this.state.selectedAlbumId,
        }
        // Submit item to the redux state.
        props.mediaSubmit(data)
      }
    }

    /**
     * Fired each time file upload progress is available.
     *
     * @param {UppyFile} file
     *   Uppy file object.
     */
    this.uploaderOnUploadProgress = (file, progress) => {
      const { bytesTotal, bytesUploaded } = progress
      const percentage = (bytesUploaded / bytesTotal) * 100
      props.mediaSetProgress(file.id, percentage)
    }

    /**
     * Fired each time a single upload is completed.
     *
     * @param {UppyFile} file
     *   Uppy file object.
     * @param {IMediaUploadResponse} response
     *   Upload response object including 'uploadUrl' property.
     */
    this.uploaderOnUploadSuccess = (file, response) => {
      const parsedUrl = new URL(response.uploadURL)
      const key = decodeURIComponent(parsedUrl.pathname.split('/')[2])
      props.mediaCreate(file.id, {
        key,
        name: file.name,
        size: file.size,
        mime: file.type!,
        album: file.meta.album,
      })
    }
  }

  componentDidMount() {
    // Update UI dimensions on window resize.
    window.addEventListener('resize', this.updateDimensions)

    // Uppy file uploader events
    window.uploader.on('file-added', this.uploaderOnFileAdded)
    window.uploader.on('upload-progress', this.uploaderOnUploadProgress)
    window.uploader.on('upload-success', this.uploaderOnUploadSuccess)
  }

  // Remove events on exit.
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)

    window.uploader.off('file-added', this.uploaderOnFileAdded)
    window.uploader.off('upload-progress', this.uploaderOnUploadProgress)
    window.uploader.off('upload-success', this.uploaderOnUploadSuccess)
    window.uploader.close()
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (prevProps.selectedAlbum !== this.props.selectedAlbum) {
      this.setState({
        selectedAlbumId: this.props.selectedAlbum?.id,
      })
    }
  }

  /**
   * Render DOM.
   *
   * @private
   *
   * @return {JSX.Element}
   *   Jsx html element.
   */
  render() {
    // Build page head title.
    const { appTitle, appName } = this.props
    let title = appTitle ? `${appTitle} | ${appName}` : appName
    return (
      <Router history={history}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Switch>
          <PrivateRoute exact path="/" component={AlbumsPage} />
          <PrivateRoute path="/users" component={UsersPage} />
          <PrivateRoute path="/trash" component={TrashPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute component={Error404} />
        </Switch>
      </Router>
    )
  }
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (
  state: IStoreState,
): { appTitle?: string; appName: string; selectedAlbum?: IAlbumSelectedProps } => {
  return {
    appTitle: state.ui.appTitle,
    appName: state.ui.appName,
    selectedAlbum: state.albums.items.filter((a) => a.selected)[0],
  }
}

export default connect(mapStateToProps, {
  setUiDimensions,
  mediaSubmit,
  mediaSetProgress,
  mediaCreate,
})(App)
