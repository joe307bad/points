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
        const navItem = this.props.title(this.props.navigation.state.routeName);
        this.setState({
            title: navItem ? navItem.name : ''
        });
    }

    public render(): JSX.Element {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.state.title}</Title>
                </Body>
                {
                    this.props.camera &&
                    <Right>
                        <Button transparent
                            onPress={() =>
                                this.props.cameraHandler &&
                                camera.takePhoto((photoData) => this.props.cameraHandler!(photoData))}>
                            <Icon name='camera' type='Entypo' />
                        </Button>
                    </Right>
                }
            </Header>
        );
    }
}
