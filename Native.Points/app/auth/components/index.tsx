import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from "react-native-elements";

import { LoginProps } from "../containers";

export default function Login({ userName = '', password = '', login = () => { } }: LoginProps) {

    const dispatchLogin = () => {
        login({ userName: 'joe307bad', password: 'P@ssw0rd' })
    }

    return (
        <View>
            <FormLabel>Username</FormLabel>
            <FormInput />
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry />
            <Button
                raised
                onPress={dispatchLogin}
                icon={{
                    name: "login",
                    type: "entypo"
                }}
                title="Login" />
        </View>
    );
}