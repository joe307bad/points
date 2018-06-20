import React, { Component } from 'react';
import { NavigationItemDto } from '@points/shared';
import { Title, Body, Header } from 'native-base';
import { BehaviorSubject } from 'rxjs';

import { IBaseProps } from '../../../navigation/components';
import { navItems } from '../../../store/selectors';
import store from '../../../store/index';
import { IBaseProps } from '../../../navigation/components/index';

//const currentNavItems: BehaviorSubject<NavigationItemDto[]> = new BehaviorSubject([new NavigationItemDto()]);
//store.subscribe(navItems((navItems: NavigationItemDto[]) => currentNavItems.next(navItems)));

interface IToolbarState {
    title: string;
}

export class Toolbar extends Component<IBaseProps> {

    state: IToolbarState = {
        title: ''
    }

    constructor(props: IBaseProps) {
        super(props);
    }

    componentDidMount() {

        // currentNavItems.subscribe(navItems => {
        //     const title = navItems.find(item => item.route === this.props.navigation.state.routeName);
        //     this.setState({
        //         title: title ? title.name : ''
        //     })
        // });
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
