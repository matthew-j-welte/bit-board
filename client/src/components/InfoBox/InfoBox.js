import React from 'react'
import { Container, Divider } from 'semantic-ui-react'

import { defaultHeaderStyle, defaultInfoTextStyle  } from './styles'


const defaultProps = {
    headerStyle: defaultHeaderStyle,
    infoTextStyle: defaultInfoTextStyle
}

const InfoBox = (props)  => (
    <Container>
        <Divider horizontal inverted={props.inverted}>
            <p style={props.headerStyle}>{props.header}</p>
        </Divider>
        <p style={props.infoTextStyle}>
            {props.infoText}
        </p>
    </Container>
)
    
InfoBox.defaultProps = defaultProps

export default InfoBox