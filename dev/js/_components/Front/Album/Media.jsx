
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import { FaChevronLeft, FaChevronRight } from 'react-icons/lib/fa'

function NextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={`${className} arrow next`}
      style={{...style}}
      onClick={onClick}
    ><FaChevronRight /></div>
  )
}

function PrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={`${className} arrow prev`}
      style={{...style}}
      onClick={onClick}
    ><FaChevronLeft /></div>
  )
}

class Media extends Component {
  
  constructor(props){
    super(props)
    
  }
  
  render(){
    const { media } = this.props
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    }
    return (

      <div className="media">
        <Slider {...settings}>
          {media.map((media, i) => 
            <div className="media-item" key={ i }>
              <img src={ media.key } />
            </div>
          )}
        </Slider>
      </div>
    )
  }
}

Media.propTypes = {
  media: PropTypes.array.isRequired
}

export default Media
