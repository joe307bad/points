import React, { Component } from 'react';
import { Container, Header, Item, Icon, Input, Button, Text, Left } from 'native-base';
import { CategoryDto, AchievementDto } from '@points/shared';
import Modal from 'react-native-modalbox';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

import { ISearchState } from '../reducers';
import { ISearchProps } from '../containers';
import { successfulCheckin } from '../../checkin/selectors';
import AchievementPreview from '../../shared/components/achievement-preview';
import { mapAchievementsToUserCheckins } from '../../store/selectors';
import AchievementList from '../../achievement/components';

interface ISearchListState {
    selectedAchievement: AchievementDto;
    searchResults: AchievementDto[];
}

type SearchComponentState = ISearchState & ISearchListState;

export class Search extends Component<ISearchProps, SearchComponentState> {

    // TODO i dont think we need the spread operator her, state does not get passed in
    public state: SearchComponentState = {
        searchTerm: this.props.searchTerm,
        selectedAchievement: {} as AchievementDto,
        searchResults: this.props.searchResults
    };
    private achievementPreview?: Modal;
    private successfulCheckinSubscription?: Subscription;

    public componentDidMount() {
        // @ts-ignore
        this.achievementPreview = this.refs.achievementPreview.refs.achievementPreviewModal;
    }

    public componentWillMount() {

        this.successfulCheckinSubscription = successfulCheckin().subscribe((isSuccessful) => {
            if (isSuccessful) {
                this.achievementPreview!.close();
                this.setState({
                    searchResults: mapAchievementsToUserCheckins(this.state.searchResults!)
                });
            }
        });

        if (this.state.searchResults) {
            this.setState({
                searchResults: mapAchievementsToUserCheckins(this.state.searchResults!)
            });
        }

    }

    public componentWillUnmount() {
        this.successfulCheckinSubscription!.unsubscribe();
    }

    public componentWillReceiveProps(nextProps: ISearchProps) {
        this.setState({
            searchResults: cloneDeep(nextProps.searchResults)
        });
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Header searchBar rounded>
                    <Left style={{ flex: 0, paddingLeft: 6, width: 60 }}>
                        <Button transparent>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
                        </Button>
                    </Left>
                    <Item>
                        <Icon name='ios-search' />
                        <Input
                            value={this.state.searchTerm}
                            onSubmitEditing={() => this.props.search(this.state.searchTerm!)}
                            placeholder='Search' onChangeText={this.updateSearchTerm.bind(this)} />
                        {typeof this.state.searchTerm !== 'undefined'
                            && this.state.searchTerm !== '' &&
                            <Button
                                transparent
                                onPress={() => this.updateSearchTerm('')}
                                style={{ marginTop: -2, marginRight: -5 }}>
                                <Icon name='cross' type='Entypo' />
                            </Button>}
                    </Item>
                    <Button transparent onPress={() => this.props.search(this.state.searchTerm!)}>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <AchievementList
                    selectAchievement={this.selectAchievement.bind(this)}
                    achievements={this.state.searchResults}
                    category={{ name: 'All' } as CategoryDto}
                    key={''} />
                <AchievementPreview
                    ref='achievementPreview'
                    selectedAchievement={this.state.selectedAchievement}
                    checkin={this.props.checkin}
                    currentUser={this.props.currentUser} />
            </Container>
        );
    }

    private updateSearchTerm(term: string) {
        this.setState({
            searchTerm: term
        });
    }

    private selectAchievement(achievement: AchievementDto) {
        this.setState({
            selectedAchievement: achievement!
        });
        this.achievementPreview!.open();
    }
}
