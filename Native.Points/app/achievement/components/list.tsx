import React, { Component } from 'react';
import { Text, Easing } from 'react-native';
import { Container, Left, Thumbnail, Card, CardItem, Body, Button, Icon } from 'native-base';
import { AchievementDto } from '@points/shared';
import { Subscription } from 'rxjs';
import Modal from 'react-native-modalbox';

import { Toolbar } from '../../shared/components';
import { IAchievementProps } from '../containers';
import { TabView, PointsContainer } from './';
import { IUserCheckin } from '../../checkin/reducers';
import { successfulCheckin } from '../../checkin/selectors';
import { ILoginState } from '../../auth/reducers';

interface IAchievementListState {
    selectedAchievement: AchievementDto;
}

export class AchievementList extends Component<IAchievementProps, IAchievementListState> {

    public state: IAchievementListState = {
        selectedAchievement: {} as AchievementDto
    };

    private achievementPreview?: Modal;
    private successfulCheckinSubscription?: Subscription;

    public componentDidMount() {
        // @ts-ignore
        this.achievementPreview = this.refs.achievementPreview.refs.achievementPreviewModal;
    }

    public componentWillMount() {
        if (!this.props.achievementList.length) {
            this.props.getAchievementList();
        }

        this.successfulCheckinSubscription = successfulCheckin().subscribe((isSuccessful) => {
            if (isSuccessful) {
                this.achievementPreview!.close();
            }
        });

    }

    public componentWillUnmount() {
        this.successfulCheckinSubscription!.unsubscribe();
    }

    public render(): JSX.Element {

        const props: IAchievementProps = Object.assign({
            selectAchievement: this.selectAchievement.bind(this)
        }, this.props);

        return (
            <Container>
                <Toolbar {...this.props} />
                {this.props.categories.length && <TabView {...props} />}
                <AchievementPreview
                    ref='achievementPreview'
                    selectedAchievement={this.state.selectedAchievement}
                    checkin={this.props.checkin}
                    currentUser={this.props.currentUser} />
            </Container>
        );
    }

    private selectAchievement(achievement: AchievementDto) {
        this.setState({
            selectedAchievement: achievement
        });
        this.achievementPreview!.open();
    }
}

class AchievementPreview extends Component<{
    selectedAchievement: AchievementDto,
    checkin: (userCheckin: IUserCheckin) => void,
    currentUser: ILoginState
}> {

    public render() {
        return (
            <Modal
                style={{ height: 'auto', padding: 10, backgroundColor: 'transparent' }}
                easing={Easing.elastic(0)}
                position={'bottom'}
                ref='achievementPreviewModal'>
                <Card style={{ flex: 0 }}>
                    <CardItem header bordered style={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Left style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }}>
                            <Thumbnail
                                style={{ marginRight: 5 }}
                                source={{
                                    // TODO store URL somewhere
                                    uri: this.props.selectedAchievement.photo
                                        ? 'https://p.jbad.io/uploads/' + this.props.selectedAchievement.photo
                                        : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                }} size={5} />
                            <Text>{this.props.selectedAchievement.name}</Text>
                        </Left>
                        <PointsContainer achievement={this.props.selectedAchievement} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{this.props.selectedAchievement.description}</Text>
                            <Button
                                onPress={() => this.props.checkin({
                                    achievementId: this.props.selectedAchievement.achievementId,
                                    achievementName: this.props.selectedAchievement.name,
                                    userId: this.props.currentUser.userId,
                                    userName: this.props.currentUser.userName
                                } as IUserCheckin)}
                                style={{ marginTop: 15 }} full>
                                <Icon type='Entypo' name='check' />
                                <Text style={{
                                    color: 'white'
                                }}>{'Check In'.toUpperCase()}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Modal>
        );
    }
}
