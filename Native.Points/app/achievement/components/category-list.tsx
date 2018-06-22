import React, { Component } from "react";
import { AchievementDto, CategoryDto } from "@points/shared";
import Modal from "react-native-modalbox";
import { Container, ListItem, Left, Thumbnail, Text, Card, CardItem, Body, Button, Right, View, Icon } from "native-base";
import { FlatList, Easing } from "react-native";

interface ICategoyListState {
    selectedAchievement: AchievementDto;
}

export class CategoryList extends Component<{ achievements: AchievementDto[], category: CategoryDto }, ICategoyListState>{

    modal?: Modal;
    state: ICategoyListState = {
        selectedAchievement: {} as AchievementDto
    }

    selectAchievement(achievementId: string) {
        const selectedAchievement = this.props.achievements.find(achievement => achievement.achievementId === achievementId);
        this.setState({
            selectedAchievement: selectedAchievement ? selectedAchievement : {} as AchievementDto
        });
        this.modal!.open();
    }

    render(): JSX.Element {

        let achievements = this.props.category.name !== 'All'
            ? this.props.achievements.filter(achievement => achievement.category === this.props.category.name)
            : this.props.achievements;

        //  TODO find more effecient way to do this
        achievements = achievements.map((achievement, index) => {
            achievement.key = index.toString();
            return achievement;
        })

        return (
            <Container>
                <FlatList
                    data={achievements}
                    renderItem={achievement =>
                        <ListItem onPress={() => this.selectAchievement(achievement.item.achievementId)}
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
                    ref={(ref: Modal) => (this.modal = ref)}>
                    <Card style={{ flex: 0 }}>
                        <CardItem header bordered style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Left style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }}>
                                <Thumbnail
                                    style={{ marginRight: 20 }}
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
                                <Button style={{ marginTop: 15 }} full>
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

class PointsContainer extends Component<{ achievement: AchievementDto }> {
    render() {
        return (
            <Right style={{ borderColor: 'transparent' }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Icon style={{
                            fontSize: 15,
                            color: 'green',
                            marginRight: 5,
                            marginTop: 3
                        }} type='Entypo' name='circle-with-plus' />
                        <Text>
                            {this.props.achievement.points}
                        </Text>
                    </View>
                </View>
            </Right>)
    }
}