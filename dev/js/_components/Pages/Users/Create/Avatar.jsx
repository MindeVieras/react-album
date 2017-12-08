
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

// import { uploadService } from '../../../../_services'
import { uploadActions } from '../../../../_actions'
import { mediaConstants, contentConstants } from '../../../../_constants'

class UserCreateAvatar extends React.Component {
  constructor() {
    super()
    this.state = {
      file: {}
    }
  }

  onDropAccepted(accepted) {
    this.setState({
      file: accepted[0]
    })
    const { auth, dispatch } = this.props
    const file = accepted[0]
    const author = auth.user.id
    const ct = contentConstants.TYPE_USER
    const status = mediaConstants.STATUS_ENABLED

    dispatch(uploadActions.avatar(file, author, ct, status))

  }

  render() {
    // console.log(this.state)
    let dropzoneRef
    // console.log(this.props);
    const { file } = this.state
    const { avatar } = this.props
    return (
      <div className="inner">
        <div className="preview">
          <div className="file-preview-item">
            <div className="image-wrapper"><img src={file.preview} /></div>
          </div>
        </div>

        {avatar.uploading &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
        {avatar.err &&
          <div>{avatar.err}</div>
        }
        {avatar.success &&
          <div>done!</div>
        }
        <Dropzone
          accept="image/jpeg, image/png"
          className="drop-area"
          ref={(node) => { dropzoneRef = node }}
          onDropAccepted={this.onDropAccepted.bind(this)}
          multiple={false}
        >
        </Dropzone>
        <div className="btn btn-sm btn-info" onClick={() => { dropzoneRef.open() }}>
          Upload file
        </div>
        
      </div>
    )
  }
}


// UserCreateAvatar.propTypes = {
//   auth: PropTypes.object.isRequired,
//   users: PropTypes.object.isRequired,
//   dispatch: PropTypes.func
// }

function mapStateToProps(state) {
  const { auth, upload } = state
  return {
    auth,
    avatar: upload.avatar
  }
}

const connectedUserCreateAvatar = connect(mapStateToProps)(UserCreateAvatar)
export { connectedUserCreateAvatar as UserCreateAvatar }
