
import React from 'react'
import PropTypes from 'prop-types'

import DeleteAlbum from '../../../Buttons/DeleteAlbum'

const Foot = ({ album_id }) => {

  return (
    <div className="album-foot">
      <div className="buttons">
        <DeleteAlbum id={ album_id } type="danger" />
      </div>
    </div>
  )
}

Foot.propTypes = {
  album_id: PropTypes.number.isRequired
}

export default Foot
