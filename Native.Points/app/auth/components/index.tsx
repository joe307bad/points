import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Button, Text, Icon, Card, CardItem, View, Body, Header, Content } from 'native-base';

import { ILoginProps } from '../containers';
import { NavigationActions, withNavigation } from 'react-navigation';

class Login extends Component<ILoginProps> {

    styles = StyleSheet.create({
        lastItem: {
            marginBottom: 10
        }
    });

    render(): JSX.Element {
        return (
            <Container>
                <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Card  style={{ flex: 1 }}>
                        <CardItem>
                            <Body>
                                <Form style={{ width: '100%' }}>
                                    <Item>
                                        <Input placeholder='Username' />
                                    </Item>
                                    <Item last style={this.styles.lastItem}>
                                        <Input secureTextEntry={true} placeholder='Password' />
                                    </Item>
                                    <Button block onPress={() =>
                                        this.props.login({ userName: 'joe307bad', password: 'P@ssw0rd' })}>
                                        <Icon type='Entypo' name='login' />
                                        <Text>
                                            Login
                                </Text>
                                    </Button>
                                    <Button block info onPress={() => this.props.navigation.dispatch(
                                        NavigationActions.navigate({ routeName: `Register` })
                                    )}>
                                        <Icon type='Entypo' name='add-user' />
                                        <Text>
                                            Register
                                </Text>
                                    </Button>
                                </Form>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

}

export default withNavigation(Login);