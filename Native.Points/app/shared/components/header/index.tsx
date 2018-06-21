import React, { Component } from 'react';
import { NavigationItemDto } from '@points/shared';
import { Title, Body, Header } from 'native-base';
import { BehaviorSubject, Subscription } from 'rxjs';

import { IBaseProps } from '../../../navigation/components';
import { navItemsWatch } from '../../../store/selectors';
import store from '../../../store/index';

interface IToolbarState {
    title: string;
}

export class Toolbar extends Component<IBaseProps> {

    navItemsSubscription?: Subscription;

    state: IToolbarState = {
        title: ''
    }

    componentWillMount() {
        const navItem = this.props.title(this.props.navigation.state.routeName);
        this.setState({
            title: navItem ? navItem.name : ''
        })
    }

    public render(): JSX.Element {
        return (
            <Header >
                <Body>
                    <Title>{this.state.title}</Title>
                </Body>
            </Header>
        );
    }
}
