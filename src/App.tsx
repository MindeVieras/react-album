import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Dispatch } from 'redux'
import { Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'

import { PrivateRoute, LoginPage, AlbumsPage, TrashPage, Error404 } from './components'
import UsersPage from './components/Page/Users/UsersPage'

import { history, mediaUploader, Ui } from './helpers'
import { setUiDimensions, mediaSubmit } from './actions'
import { IStoreState, IAlbumSelectedProps } from './reducers'
import { OnStatusChange, OnComplete } from 'fine-uploader/lib/core'
import { IMediaSubmitProps } from './services'

interface IAppProps {
  appTitle?: string
  appName: string
  setUiDimensions: Function
  selectedAlbum?: IAlbumSelectedProps
  mediaSubmit: (data: IMediaSubmitProps) => void
}

interface IAppState {
  selectedAlbumId?: string
}

/**
 * This is main App component.
 *
 * @module App
 */
class App extends Component<IAppProps, IAppState> {
  uploaderOnStatusChange: OnStatusChange
  uploaderOnComplete: OnComplete

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
    // Update UI dimensions on window resize.
    window.addEventListener('resize', this.updateDimensions.bind(this))

    // Set media uploader as global window object.
    window.uploader = mediaUploader()
    const statusEnum = window.uploader.qq.status

    this.uploaderOnStatusChange = (id, oldStatus, status) => {
      // Submitting files
      if (status === statusEnum.SUBMITTED) {
        const { size, type, name } = window.uploader.methods.getFile(id) as File

        // Set additional params to S3 upload success.
        const s3params = { size, mime: type, album: this.state.selectedAlbumId }
        window.uploader.methods.setUploadSuccessParams(s3params, id)

        // Set media data
        const data = { id, status, size, mime: type, name, album: this.state.selectedAlbumId }
        props.mediaSubmit(data)
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        // props.dispatch(albumsActions.setMediaPhase(id, status))
      }
    }

    this.uploaderOnComplete = (id, name, responseJSON, xhr) => {
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

  // Update state with new dimensions.
  updateDimensions() {
    this.props.setUiDimensions()
  }

  componentDidMount() {
    window.uploader.on('statusChange', this.uploaderOnStatusChange)
    window.uploader.on('complete', this.uploaderOnComplete)
  }

  componentWillUnmount() {
    window.uploader.off('statusChange', this.uploaderOnStatusChange)
    window.uploader.off('complete', this.uploaderOnComplete)
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

export default connect(mapStateToProps, { setUiDimensions, mediaSubmit })(App)
