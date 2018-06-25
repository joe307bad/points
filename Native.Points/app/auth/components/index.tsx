import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Button, Text, Icon } from 'native-base';

import { ILoginProps } from '../containers';

export default function Login({ login = () => { } }: ILoginProps) {

    const styles = StyleSheet.create({
        lastItem: {
            marginBottom: 10
        }
    });

    return (
        <Container>
            <Form>
                <Item>
                    <Input placeholder='Username' />
                </Item>
                <Item last style={styles.lastItem}>
                    <Input secureTextEntry={true} placeholder='Password' />
                </Item>
                <Button block onPress={() => login({ userName: 'joe307bad', password: 'P@ssw0rd' })}>
                    <Icon type='Entypo' name='login' />
                    <Text>
                        Login
                    </Text>
                </Button>
            </Form>
        </Container>
    );

}
