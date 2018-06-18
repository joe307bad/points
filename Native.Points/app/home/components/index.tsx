import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Container, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";

import { Header } from "../../shared/components";
import Login from "../../auth/components";
import store from "../../store";

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Login />
        </Content>
      </Container>
    );
  }
}