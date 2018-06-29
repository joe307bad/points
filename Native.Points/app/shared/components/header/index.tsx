import React, { Component } from 'react';
import { Title, Body, Header, Left, Button, Icon, Right } from 'native-base';

import camera from '../../../core/camera';
import { IBaseProps } from '../../../navigation/components';

interface IToolbarState {
    title: string;
}

export class Toolbar extends Component<IBaseProps> {

    public state: IToolbarState = {
        title: ''
    };

    public componentWillMount() {
        const routeName = (this.props.navigation.state as any).routeName;
        const navItem = this.props.title(routeName);
        this.setState({
            title: navItem ? navItem.name : routeName
        });
    }

    public render(): JSX.Element {
        return (
            <Header>
                {!this.props.disableMenuButton &&
                    <Left>
                        <Button transparent>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
                        </Button>
                    </Left>}
                <Body>
                    <Title>{this.state.title}</Title>
                </Body>
                {this.props.camera &&
                    <Right>
                        <Button transparent
                            onPress={() =>
                                this.props.cameraHandler &&
                                camera.takePhoto((photoData) => this.props.cameraHandler!(photoData))}>
                            <Icon name='camera' type='Entypo' />
                        </Button>
                    </Right>}
            </Header>
        );
    }
}
