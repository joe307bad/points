import React, { Component } from "react";
import { AchievementDto, CategoryDto } from "@points/shared";
import Modal from "react-native-modalbox";
import { Container, ListItem, Left, Thumbnail, Text, Card, CardItem, Body, Button, Right, View, Icon } from "native-base";
import { FlatList, Easing } from "react-native";
import { Subscription } from "rxjs";

import { IUserCheckin } from "../../checkin/reducers";
import { ILoginState, currentUser } from '../../auth/reducers';
import { successfulCheckin } from '../../checkin/selectors';
import { PointsContainer } from './';

interface ICategoryListProps {
    tabLabel: string;
    achievements: AchievementDto[];
    category: CategoryDto;
    currentUser: ILoginState;
    key: any;
    checkin: (userCheckin: IUserCheckin) => void;
    selectAchievement: (achievement: AchievementDto) => void;
}

interface ICategoryListState {
    selectedAchievement: AchievementDto;
}

export class CategoryList extends Component<ICategoryListProps>{

    successfulCheckinSubscription?: Subscription;
    achievementPreviewModal?: Modal;

    state: ICategoryListState = {
        selectedAchievement: {} as AchievementDto
    }

    constructor(props: ICategoryListProps) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.successfulCheckinSubscription = successfulCheckin().subscribe((isSuccessful) => {
            if (isSuccessful) {
                debugger;
                // @ts-ignore
                this.closeModal();
            }
        });
    }

    componentWillUnmount() {
        this.successfulCheckinSubscription!.unsubscribe();
    }

    selectAchievement(selectedAchievement: AchievementDto) {
        this.setState({
            selectedAchievement: selectedAchievement
        });
        this.achievementPreviewModal!.open();
    }

    closeModal() {
        debugger;
        this.achievementPreviewModal!.close();
    }

    render(): JSX.Element {

        let achievements = this.props.category.name !== 'All'
            ? this.props.achievements.filter(achievement => achievement.category === this.props.category.name)
            : this.props.achievements;

        //  TODO find more effecient way to do this
        achievements = achievements.map((achievement, index) => {
            // @ts-ignore
            achievement.key = index.toString();
            return achievement;
        })

        return (
            <Container>
                <FlatList
                    data={achievements}
                    renderItem={achievement =>
                        <ListItem
                            onPress={() => this.selectAchievement(achievement.item)}
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Left>
                                <Thumbnail
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    source={{
                                        // TODO store URL somewhere
                                        uri: achievement.item.photo
                                            ? 'https://p.jbad.io/uploads/' + achievement.item.photo
                                            : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                    }} size={5} />
                            </Left>
                            <Body style={{ borderColor: 'transparent' }}>
                                <Text>{achievement.item.name}</Text>
                            </Body>
                            <PointsContainer achievement={achievement.item} />
                        </ListItem>
                    }
                />
                <Modal
                    style={{ height: 'auto', padding: 10, backgroundColor: 'transparent' }}
                    easing={Easing.elastic(0)}
                    position={'bottom'}
                    ref={(ref: Modal) => this.achievementPreviewModal = ref}>
                    <Card style={{ flex: 0 }}>
                        <CardItem header bordered style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Left style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }}>
                                <Thumbnail
                                    style={{ marginRight: 5 }}
                                    source={{
                                        // TODO store URL somewhere
                                        uri: this.state.selectedAchievement.photo
                                            ? 'https://p.jbad.io/uploads/' + this.state.selectedAchievement.photo
                                            : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                    }} size={5} />
                                <Text>{this.state.selectedAchievement.name}</Text>
                            </Left>
                            <PointsContainer achievement={this.state.selectedAchievement} />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{this.state.selectedAchievement.description}</Text>
                                <Button
                                    onPress={() => this.props.checkin({
                                        achievementId: this.state.selectedAchievement.achievementId,
                                        achievementName: this.state.selectedAchievement.name,
                                        userId: this.props.currentUser.userId,
                                        userName: this.props.currentUser.userName
                                    } as IUserCheckin)}
                                    style={{ marginTop: 15 }} full>
                                    <Icon type='Entypo' name='check' />
                                    <Text>Check In</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Modal>
            </Container>
        )
    }
}

// class AchievementPreview extends Component<{
//     selectedAchievement: AchievementDto,
//     checkin: (userCheckin: IUserCheckin) => void,
//     currentUser: ILoginState
// }> {
//     render() {
//         return (
//             )
//     }
// }

{/* <AchievementPreview ref='achievementPreview' {...{
                    selectedAchievement: this.state.selectedAchievement,
                    checkin: this.props.checkin,
                    currentUser: this.props.currentUser
                }} /> */}