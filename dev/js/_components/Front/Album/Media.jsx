
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Media extends Component {
  
  constructor(props){
    super(props)
    
  }
  
  render(){
    const { media } = this.props
    return (
      <div
        className="media"
      >
        {media.map((media, i) => 
          <div className="media-item" key={ i }>
            <img src={ media.key } />
          </div>
        )}
      </div>
    )
  }
}

Media.propTypes = {
  media: PropTypes.array.isRequired
}

export default Media
