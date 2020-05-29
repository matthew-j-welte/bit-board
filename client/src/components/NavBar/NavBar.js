import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { routeInfo, logoRouteInfo } from './constants'
import { menuStyle } from './styles'

class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  generateNavLink = (el) => (
    <NavLink to={el.path}>
      <Menu.Item
        name={el.key}
        active={this.state.activeItem === el.key}
        onClick={this.handleItemClick}
      >
        {el.title}
      </Menu.Item>
    </NavLink>
  )

  render() {
    const logoNavLink = this.generateNavLink(logoRouteInfo)
    const navlinks = routeInfo.map(route => this.generateNavLink(route))

    return (
      <Menu 
        inverted 
        stackable 
        size="huge" 
        style={menuStyle}
      >
        {logoNavLink}
        <Menu.Menu position="right">
          {navlinks}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar