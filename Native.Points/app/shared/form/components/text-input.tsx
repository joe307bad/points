// MaterialTextInput.js
import React from 'react';
import { View } from 'react-native';
import { Input, Form, Item, Button, Icon, Text, Content, Container } from 'native-base';
import { debounce } from 'lodash'

export interface ITextInputProps {
    onChangeText?: (name: string, value: any) => void;
    onPause?: (value: string) => void;
    loading?: boolean;
    showLoadingIcon?: () => void;
    errors?: string | boolean;
    secureTextEntry?: boolean;
    touched?: boolean;
    value?: any;
    title: string;
    name: string;
}

// TODO make stateless
export default class TextInput extends React.Component<ITextInputProps> {

    handleChange = (value: string) => {
        if (this.props.onChangeText) {
            this.props.onChangeText(this.props.name, value);
        }
    };

    showLoadingIcon = () => {
        if (this.props.showLoadingIcon) {
            this.props.showLoadingIcon();
        }
    }

    handleOnPause = debounce((value: string) => {
        if (this.props.onPause) {
            this.props.onPause(value);
        }
    }, 1000);

    render() {

        // we want to pass through all the props except for onChangeText
        const { onChangeText, ...props } = this.props;
        return (
            <Item
                success={!props.errors}
                error={props.errors !== false && props.errors !== undefined}>
                <Input
                    secureTextEntry={props.secureTextEntry}
                    placeholder={props.title}
                    value={props.value}
                    onChangeText={(value: string) => {
                        this.handleChange(value);
                        if (props.onPause && value.trim() !== '') {
                            this.showLoadingIcon();
                        }
                        this.handleOnPause(value);
                    }}
                />
                {this.props.loading && !props.errors && <Text>Checking...</Text>}
                {props.touched && !props.errors && !this.props.loading && <Icon name='checkmark-circle' />}
                {props.errors && <Icon name='close-circle' />}
                {props.errors &&
                    <Text>
                        {props.errors}
                    </Text>}
            </Item>
        );
    }
}