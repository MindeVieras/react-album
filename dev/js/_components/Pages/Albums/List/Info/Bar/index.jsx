
import React from 'react'
import PropTypes from 'prop-types'

import Name from './Name'
import DeleteAlbum from '../../../../../Buttons/DeleteAlbum'

const Bar = ({ album_id, name }) => {

  return (
    <div className="album-bar">
      <Name name={ name } album_id={ album_id } />
      <div className="buttons">
        <DeleteAlbum id={ album_id } type="danger" />
      </div>
    </div>
  )
}

Bar.propTypes = {
  album_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Bar
