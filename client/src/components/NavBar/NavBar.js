import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import GBIcon from '../../assets/images/BB.png'

class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size="huge" inverted stackable style={{borderRadius: 0, margin:0}}>
        <Menu.Item
          name='icon'
          active={activeItem === 'icon'}
          onClick={this.handleItemClick}
        >
          <img src={GBIcon} />
        </Menu.Item>
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
      </Menu>
    )
  }
}

export default NavBar