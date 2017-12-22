
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../../Partials/Spinner'

import ListItem from './ListItem'

import { headerActions, footerActions, trashActions } from '../../../_actions'

class TrashPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(headerActions.setTitle('Trash'))
    dispatch(footerActions.buttonsClear())

    dispatch(trashActions.getList())
  }

  render() {
    const { media } = this.props
    return (
      <div id="trash_page">
        {media.loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {media.err &&
          <div>{media.err}</div>
        }
        {media.items &&
          <ul>
            {media.items.map((m) =>
              <ListItem key={ m.id } media={ m } />
            )}
          </ul>
        }
      </div>
    )
  }
}

TrashPage.propTypes = {
  media: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { trash } = state
  return {
    media: trash.list
  }
}

export default connect(mapStateToProps)(TrashPage)
