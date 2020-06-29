import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { routeInfo } from './constants'
import * as styles from './styles'

class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  generateNavLink = (el) => (
    <NavLink 
      key={el.key}
      to={el.path}
    >
      <Menu.Item
        name={el.key}
        active={this.state.activeItem === el.key}
        onClick={this.handleItemClick}
      >
        <p style={styles.textStyle}>{el.title}</p>
      </Menu.Item>
    </NavLink>
  )

  render() {
    const navlinks = routeInfo.map(route => this.generateNavLink(route))

    return (
      <Menu 
        stackable 
        size="huge" 
        style={styles.menuStyle}
      >
        <Menu.Menu position="right">
          {navlinks}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar