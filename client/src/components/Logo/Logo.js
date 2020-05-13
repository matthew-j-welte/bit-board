import React from 'react'
import { Icon } from 'semantic-ui-react'

// marginBottom: ".3em"

const Logo = (props) => (
  <Icon 
    circular 
    bordered
    name="user secret" 
    size={props.size} 
    style={{background: "#3ad6bc", ...props.extraStyle }}
    {...props}
  />
)

export default Logo