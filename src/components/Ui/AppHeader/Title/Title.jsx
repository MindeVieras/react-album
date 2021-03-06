
import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import AlbumName from './AlbumName'

import { history } from 'Helpers'

const Title = ({ album_id, title }) => {

  if (album_id) {
    return <AlbumName name={ title } album_id={ album_id } />
  }
  else {
    return (
      <Typography
        variant="h6"
        color="inherit"
        style={{ cursor: `pointer` }}
        onClick={ () => history.push('/admin') }
      >
        { title }
      </Typography>
    )
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  album_id: PropTypes.number
}

Title.defaultProps = {
  album_id: null
}

export default Title
