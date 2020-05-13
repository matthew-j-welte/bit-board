import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'

import Logo from '../../components/Logo/Logo'
import BitBoardLogo from '../../assets/images/BitBoard.png'
class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu position="right" size="huge" inverted stackable style={{borderRadius: 0, margin:0}}>
        <Menu.Item
          name='icon'
          active={activeItem === 'icon'}
          onClick={this.handleItemClick}
        >
          <Image size="small" src={BitBoardLogo}/>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name='features'
            active={activeItem === 'features'}
            onClick={this.handleItemClick}
          >
            Features
          </Menu.Item>
          <Menu.Item
            name='testimonials'
            active={activeItem === 'testimonials'}
            onClick={this.handleItemClick}
          >
            Testimonials
          </Menu.Item>
          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={this.handleItemClick}
          >
            Sign-in
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar