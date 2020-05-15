import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import BitBoardLogo from '../../assets/images/BitBoard.png'
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
    const logoNav = this.generateNavLink(
      {key: "icon", title: <Image size="small" src={BitBoardLogo}/>, path: "/home"}
    )
    const navlinks = [
      {key: "code", title: "Code", path: "/code"},
      {key: "workspace", title: "Workspace", path: "/workspace"},
      {key: "learn", title: "Learn", path: "/learn"}, 
      {key: "network", title: "Network", path: "/"},
      {key: "level-up", title: "Level Up", path: "/persona"},
      {key: "sign-in", title: "Sign In", path: "/"},
    ].map(el => this.generateNavLink(el))

    return (
      <Menu 
        inverted 
        stackable 
        size="huge" 
        style={{borderRadius: 0, margin:0, borderBottom: '2px solid #303030'}}
      >
        {logoNav}
        <Menu.Menu position="right">
          {navlinks}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar