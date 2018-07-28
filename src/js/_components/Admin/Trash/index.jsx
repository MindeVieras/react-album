
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../Partials/Spinner'

import { IoTrashA } from 'react-icons/lib/io'
import MediaItem from './MediaItem'
import AlbumsItem from './AlbumsItem'

import { headerActions, trashActions } from '../../../_actions'

class TrashPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(headerActions.setTitle('Trash'))
    dispatch(trashActions.getList())
  }

  render() {
    const { media, albums, loading, err } = this.props.list
    // console.log(this.props.list)
    let emptyContent

    if (!media) {
      emptyContent = <span className="trash-empty-text">
        <div className="icon">
          <IoTrashA />
        </div>
        Trash is empty
      </span>
    }
    return (
      <div id="trash_page">
        {loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {err &&
          <div>{err}</div>
        }
        {media &&
          <div className="media-list list">
            <div className="list-title">Media</div>
            <ul>
              {media.map((m) =>
                <MediaItem key={ m.id } media={ m } />
              )}
            </ul>
          </div>
        }
        {albums &&
          <div className="albums-list list">
            <div className="list-title">Albums</div>
            <ul>
              {albums.map((a) =>
                <AlbumsItem key={ a.id } album={ a } />
              )}
            </ul>
          </div>
        }
        { emptyContent }
      </div>
    )
  }
}

TrashPage.propTypes = {
  list: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { trash } = state
  return {
    list: trash.list
  }
}

export default connect(mapStateToProps)(TrashPage)
