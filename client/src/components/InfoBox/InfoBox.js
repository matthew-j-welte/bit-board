import React from 'react'
import {
  Container,
  Divider
} from 'semantic-ui-react'

const InfoBox = (props)  => (
    <Container style={props.containerStyle}>
        <Divider horizontal inverted>
            <p style={props.headerStyle}>
                {props.header}
            </p>
        </Divider>
            <p style={props.infoTextStyle}>
                {props.infoText}
            </p>
    </Container>
)
    
InfoBox.defaultProps = {
    containerStyle: { padding: '4em 0em 0em 0em' },
    headerStyle: { fontSize: 24, fontFamily: 'Palatino' },
    infoTextStyle: { fontSize: 16, fontFamily: 'Palatino', lineHeight: "175%" },
    header: "FILL IN HEADER PROP",
    infoText: "FILL IN INFO TEXT PROP"
}

export default InfoBox