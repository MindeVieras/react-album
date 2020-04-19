import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'

import { PrivateRoute, LoginPage, AlbumsPage, TrashPage, Error404 } from './components'
import UsersPage from './components/Page/Users/UsersPage'

import { history, mediaUploader } from './helpers'
import { setUiDimensions } from './actions'
import { IStoreState } from './reducers'
import { OnStatusChange, OnComplete } from 'fine-uploader/lib/core'

interface IAppProps {
  appTitle?: string
  appName: string
  setUiDimensions: Function
}

/**
 * This is main App component.
 *
 * @module App
 */
class App extends Component<IAppProps> {
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
        // const { albumId } = this.props
        const { size, type } = window.uploader.methods.getFile(id)

        // Set additional params to S3 upload success.
        const s3params = { size, mime: type }
        window.uploader.methods.setUploadSuccessParams(s3params, id)

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
const mapStateToProps = (state: IStoreState): { appTitle?: string; appName: string } => {
  return {
    appTitle: state.ui.appTitle,
    appName: state.ui.appName,
  }
}

export default connect(mapStateToProps, { setUiDimensions })(App)
