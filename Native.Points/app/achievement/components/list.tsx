import React, { Component } from "react";
import { Container, Text } from "native-base";

import { Header } from "../../shared/components";

export class AchievementList extends Component {
    render(): JSX.Element {
        return (
            <Container>
                <Header />
                <Text>Achievment List</Text>
            </Container>
        );
    }
}