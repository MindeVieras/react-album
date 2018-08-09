
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Motion, spring } from 'react-motion'
import Rnd from 'react-rnd'

import { IoNavicon, IoCube, IoHome, IoLogOut } from 'react-icons/lib/io'

import { frontUiActions, utilsActions } from 'Actions'

// CONSTANTS
// Value of 1 degree in radians
const DEG_TO_RAD = 0.0174533
const ELEMENTS = [
  {
    icon: <Link to="/login"><IoLogOut /></Link>,
    onClick: () => {}
  },
  {
    icon: <Link to="/"><IoHome /></Link>,
    onClick: () => {}
  },
  {
    icon: <Link to="/admin"><IoCube /></Link>,
    onClick: () => {}
  }
]

// UTILITY FUNCTIONS
function toRadians(degrees) {
  return degrees * DEG_TO_RAD
}

class CircleMenu extends Component {

  constructor(props){
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu(){
    const { menu_open, dispatch } = this.props
    dispatch(frontUiActions.menuOpen(!menu_open))
  }

  getMainButtonStyle(){
    let { mainButtonDiam } = this.props
    return {
      width: mainButtonDiam,
      height: mainButtonDiam
    }
  }

  getInitalChildButtonStyle(){
    let { childButtonDiam, mainButtonDiam, stiffness, damping } = this.props
    return {
      width: childButtonDiam,
      height: childButtonDiam,
      zIndex: -1,
      top: spring(mainButtonDiam/2 - childButtonDiam/2, {stiffness, damping}),
      left: spring(mainButtonDiam/2 - childButtonDiam/2, {stiffness, damping})
    }
  }

  getFinalChildButtonStyle(index){
    let { childButtonDiam, mainButtonDiam, stiffness, damping } = this.props
    let { deltaX, deltaY } = this.getFinalDeltaPositions(index)
    return {
      width: childButtonDiam,
      height: childButtonDiam,
      zIndex: spring(0),
      top: spring(mainButtonDiam/2 + deltaX, {stiffness, damping}),
      left: spring(mainButtonDiam/2 - deltaY, {stiffness, damping})
    }
  }

  getFinalDeltaPositions(index) {
    let NUM_CHILDREN = this.props.elements.length
    let CHILD_BUTTON_DIAM = this.props.childButtonDiam
    let FLY_OUT_RADIUS = this.props.flyOutRadius
    let SEPARATION_ANGLE = this.props.seperationAngle
    let ROTATION = this.props.rotation
    let FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE
    let BASE_ANGLE = ((180 - FAN_ANGLE)/2)+90+ROTATION

    let TARGET_ANGLE = BASE_ANGLE + ( index * SEPARATION_ANGLE )
    return {
      deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(TARGET_ANGLE)) - (CHILD_BUTTON_DIAM/2),
      deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(TARGET_ANGLE)) + (CHILD_BUTTON_DIAM/2)
    }
  }

  getCProps(){
    return {
      childButtonProps: (style, onClick) => ({
        className: "button-child",
        style,
        onClick
      }),
      childButtonMotionProps: (index, menu_open) => ({
        key: index,
        style: menu_open ? this.getFinalChildButtonStyle(index) : this.getInitalChildButtonStyle()
      })
    }
  }

  renderChildButton(item, index){
    let { menu_open } = this.props
    let cp = this.getCProps()

    return <Motion {...cp.childButtonMotionProps(index, menu_open)}>
      {
        (style) => <div {...cp.childButtonProps(style, item.onClick)}>
          { item.icon }
        </div>
      }
    </Motion>
  }

  onMenuDragStop(e, d) {
    let { user_id, screen, dispatch } = this.props
    let { width, height } = this.props.screen
    let { x, y } = d
    let xPercent = (x / (width - 55)) * 100
    let yPercent = (y / (height - 55)) * 100
    dispatch(utilsActions.saveFrontSetting('c_menu_x', xPercent, user_id))
    dispatch(utilsActions.saveFrontSetting('c_menu_y', yPercent, user_id))
  }

  render(){
    let { screen, menu_x, menu_y, elements } = this.props
    if (screen) {
      let { width, height } = screen
      let xPixel = ((width - 55) / 100) * menu_x
      let yPixel = ((height - 55) / 100) * menu_y
      return (
        <div>
          <Rnd
            className="circle_menu"
            default={{
              x: xPixel,
              y: yPixel,
              width: 55,
              height: 55
            }}
            enableResizing={{
              top:false,
              right:false,
              bottom:false,
              left:false,
              topRight:false,
              bottomRight:false,
              bottomLeft:false,
              topLeft:false
            }}
            onDragStop={(e, d) => { this.onMenuDragStop(e, d) }}
            bounds={ '#front_page' }
          >
            <div className="button-container">
              { elements.map((item, i) => this.renderChildButton(item, i)) }
              <div
                className="button-menu"
                style={this.getMainButtonStyle()}
                onClick={this.toggleMenu}
              >
                <IoNavicon />
              </div>
            </div>
          </Rnd>
        </div>
      )
    } else {
      return <span />
    }
  }
}

CircleMenu.propTypes = {
  flyOutRadius: PropTypes.number,
  seperationAngle: PropTypes.number,
  mainButtonDiam: PropTypes.number,
  childButtonDiam: PropTypes.number,
  stiffness: PropTypes.number,
  damping: PropTypes.number,
  rotation: PropTypes.number
}

CircleMenu.defaultProps = {
  mainButtonDiam: 55,
  childButtonDiam: 45,
  flyOutRadius: 75,
  seperationAngle: 40,
  stiffness: 320,
  damping: 17,
  rotation: 225,
  elements: ELEMENTS
}

function mapStateToProps(state) {
  const { auth, client, settings, front_ui } = state
  return {
    user_id: auth.user.id,
    menu_open: front_ui.menu_open,
    menu_x: parseFloat(settings.front.c_menu_x),
    menu_y: parseFloat(settings.front.c_menu_y),
    screen: client.screen
    // client_width: client.screen.width
  }
}

export default connect(mapStateToProps)(CircleMenu)
