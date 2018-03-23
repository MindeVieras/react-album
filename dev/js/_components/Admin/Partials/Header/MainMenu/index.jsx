
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropdownMenu from 'react-dd-menu'

import { IoPersonStalker, IoHome } from 'react-icons/lib/io'
import { GoSignOut } from 'react-icons/lib/go'
import { MdFace } from 'react-icons/lib/md'

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
    
    this.toggle = this.toggle.bind(this)
    this.close = this.close.bind(this)
  }
 
  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }
 
  close() {
    this.setState({ isMenuOpen: false })
  }
 
  render() {
    let activeClass = this.state.isMenuOpen ? ' is-active' : ''
    const hamburger = <div
      onClick={this.toggle}
      className={ `hamburger hamburger--3dxy${activeClass}` }
    >
      <div className="hamburger-box">
        <div className="hamburger-inner"></div>
      </div>
    </div>

    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: hamburger,
      align: 'right'
    }

    return (
      <DropdownMenu {...menuOptions}>
        <li><Link to="/admin/faces">Faces <i><MdFace /></i></Link></li>
        <li><Link to="/admin/users">Users <i><IoPersonStalker /></i></Link></li>
        <li><Link to="/">Front <i><IoHome /></i></Link></li>
        <li><Link to="/login">Logout <i><GoSignOut /></i></Link></li>
      </DropdownMenu>
    )
  }
}

export default MainMenu
