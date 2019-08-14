import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements'


export class SongCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
        this.checkBox = React.createRef();
    }
    render() {
        return (
            <CheckBox ref={this.checkBox} title={this.props.name} checked={this.state.checked} onPress={(() => {
                this.setState({checked: !this.state.checked})
            })}></CheckBox>
        )
    }
}

export default SongCheckBox;
