
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'

import { IoPlusRound } from 'react-icons/lib/io'

import { albumsActions } from '../../../_actions'
import { albumsService } from '../../../_services'
import { albumsConstants } from '../../../_constants'

class NewAlbum extends Component {
  constructor(props) {
    super(props)

  }

  handleClick() {
    const { dispatch } = this.props
    let start_date = moment().format('YYYY-MM-DD HH:mm:ss')
    let end_date = moment().format('YYYY-MM-DD HH:mm:ss')
    const album = {
      name: 'Unknown album',
      start_date,
      end_date,
      access: albumsConstants.PRIVATE,
      status: albumsConstants.ENABLED
    }
    albumsService.create(album)
      .then(function(res){
        if (res.ack == 'ok') {
          album.id = res.id
          dispatch(albumsActions.addToList(album))
          dispatch(albumsActions.getOne(res.id))
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className={ `btn btn-sm btn-${this.props.type}` }
      >
        <IoPlusRound />
      </div>
    )
  }
}

export default connect()(NewAlbum)
