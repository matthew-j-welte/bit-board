import React from 'react'
import { Menu } from 'semantic-ui-react'

import ResourceTypeTab from './ResourceTypeTab/ResourceTypeTab'
import { menuTabInfo } from './constants'

const ResourceTypeTabs = (props) => {
    const menuTabs = menuTabInfo.map(tab => (
        <ResourceTypeTab
            componentKey={tab.componentKey}
            icon={tab.icon}
            title={tab.title}
            formConfig={tab.config}
            {...props} 
        />
    ))
        
    return (
        <Menu color="teal" icon="labeled" widths={3}>
            {menuTabs}
        </Menu>
    )
}

export default ResourceTypeTabs;