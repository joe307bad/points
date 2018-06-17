import React from "react";
import { View } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";

import { LoginProps } from "../containers";

export default function Login({login = () => { } }: LoginProps) {

    return (
        <View>
            <FormLabel>Username</FormLabel>
            <FormInput />
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry />
            <Button
                raised
                onPress={() => login({ userName: 'tism', password: 'P@ssw0rd' })}
                icon={{
                    name: "login",
                    type: "entypo"
                }}
                title="Login" />
        </View>
    );
}