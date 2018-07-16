import React, { Component } from 'react';
import { Title, Body, Header, Left, Button, Icon, Right } from 'native-base';

import camera from '../../../core/camera';
import { IBaseProps } from '../../../navigation/components';
import { NavigationActions } from 'react-navigation';

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
                <Left style={{ flex: 0, paddingLeft: 6, width: 60 }}>
                    {!this.props.disableMenuButton &&
                        <Button transparent onPress={this.props.navigation.openDrawer}>
                            <Icon name='menu' />
                        </Button>}
                    {this.props.enableBackButton &&
                        <Button transparent onPress={() =>
                            this.props.navigation.dispatch(
                                NavigationActions.navigate({ routeName: `Home` })
                            )}>
                            <Icon name='arrow-with-circle-left' type='Entypo' />
                        </Button>}
                </Left>
                <Body>
                    <Title>{this.state.title}</Title>
                </Body>
                <Right>
                    {this.props.refresh && <Button transparent
                        onPress={() => this.props.refreshHandler && this.props.refreshHandler()}>
                        <Icon name='refresh' />
                    </Button>}
                    {this.props.camera && <Button transparent
                        onPress={() =>
                            this.props.cameraHandler &&
                            camera.takePhoto((photoData) => this.props.cameraHandler!(photoData))}>
                        <Icon name='camera' type='Entypo' />
                    </Button>}
                </Right>
            </Header>
        );
    }
}
