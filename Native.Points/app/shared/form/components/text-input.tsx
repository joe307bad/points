import React, { Component } from 'react';
import { Input, Item, Icon, Text } from 'native-base';
import { debounce } from 'lodash';

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
    asyncError?: { passing: boolean, message: string };
    style?: {};
}

// TODO make stateless
export default class TextInput extends Component<ITextInputProps> {

    private handleOnPause = debounce((value: string) => {
        if (this.props.onPause) {
            this.props.onPause(value);
        }
    }, 1000);

    public render() {

        // we want to pass through all the props except for onChangeText
        const { onChangeText, ...props } = this.props;
        const asyncError = this.props.asyncError && !this.props.asyncError.passing;

        return (
            <Item
                style={this.props.style}
                success={!props.errors && !asyncError}
                error={(props.errors !== false && props.errors !== undefined) || asyncError}>
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
                {props.touched
                    && !props.errors
                    && !this.props.loading
                    && !asyncError
                    && <Icon name='checkmark-circle' />}
                {(props.errors || asyncError) && !this.props.loading && <Icon name='close-circle' />}
                {asyncError && !this.props.loading && <Text>{this.props.asyncError!.message}</Text>}
                {props.errors &&
                    <Text>
                        {props.errors}
                    </Text>}
            </Item>
        );
    }

    private handleChange = (value: string) => {
        if (this.props.onChangeText) {
            this.props.onChangeText(this.props.name, value);
        }
    }

    private showLoadingIcon = () => {
        if (this.props.showLoadingIcon) {
            this.props.showLoadingIcon();
        }
    }
}
