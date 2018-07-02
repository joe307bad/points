// MaterialTextInput.js
import React from 'react';
import { View } from 'react-native';
import { Input, Form, Item, Button, Icon, Text, Content, Container } from 'native-base';


export default class TextInput extends React.Component<any> {
    handleChange = (value: string) => {
        // remember that onChangeText will be Formik's setFieldValue
        debugger; 
        this.props.onChangeText(this.props.name, value);
    };

    render() {
        // we want to pass through all the props except for onChangeText
        const { onChangeText, ...otherProps } = this.props;
        return (
            <Item>
                <Input
                    onChangeText={this.handleChange}
                    {...otherProps} // IRL, you should be more explicit when using TS
                />
            </Item>
        );
    }
}