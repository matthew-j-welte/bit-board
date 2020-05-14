import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'

import BitBoardLogo from '../../assets/images/BitBoard.png'
class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  generateNavLink = (el) => (
    <Menu.Item
      name={el.key}
      active={this.state.activeItem === el.key}
      onClick={this.handleItemClick}
    >
      {el.title}
    </Menu.Item>
  )

  render() {
    const logoNav = this.generateNavLink(
      {key: "icon", title: <Image size="small" src={BitBoardLogo}/>}
    )
    const navlinks = [
      {key: "code", title: "Code"},
      {key: "workspace", title: "Workspace"},
      {key: "learn", title: "Learn"}, 
      {key: "network", title: "Network"},
      {key: "level-up", title: "Level Up"},
      {key: "sign-in", title: "Sign In"},
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