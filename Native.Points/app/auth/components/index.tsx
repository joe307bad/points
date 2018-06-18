import React from "react";
import { View } from "react-native";
import { Container, Form, Item, Input, Button, Text, Icon } from "native-base";
import { Provider } from "react-redux";

import { LoginProps } from "../containers";
import store from "../../store";

export default function Login({ login = () => { } }: LoginProps) {

    return (
            <Container>
                <Form>
                    <Item>
                        <Input placeholder="Username" />
                    </Item>
                    <Item last>
                        <Input secureTextEntry={true} placeholder="Password" />
                    </Item>
                    <Button block onPress={() => {
                        debugger;
                        login({ userName: 'tism', password: 'P@ssw0rd' })
                    }}>
                        <Icon type="Entypo" name='login' />
                        <Text>
                            Login
                    </Text>
                    </Button>
                </Form>
            </Container>
    );
}