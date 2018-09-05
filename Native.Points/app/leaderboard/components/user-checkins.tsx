import { UserCheckinsDto } from '@points/shared';
import { Component } from 'react';
import { filterUserCheckins } from '../selectors';
import { Thumbnail, Body, View, CardItem, Card, Text } from 'native-base';
import { UserCheckinAudit } from '../reducers';
import { Easing, ScrollView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modalbox';

export interface IUserCheckinsProps {
    checkins: Map<string, UserCheckinsDto>;
    userId: string;
}

export default class UserCheckins extends Component<IUserCheckinsProps> {

    state: { checkins: Map<string, UserCheckinsDto>, userId: string } = {
        checkins: this.props.checkins,
        userId: this.props.userId
    }

    public componentWillReceiveProps(
        nextProps: IUserCheckinsProps,
        prevProps: IUserCheckinsProps) {
        // return nextProps.checkins !== nextProps.checkins;
        this.setState({
            checkins: this.props.checkins,
            userId: this.props.userId
        })
        return true;
    }

    public render(): JSX.Element {
        var userCheckins = {} as UserCheckinAudit;

        if (this.state.userId && this.state.checkins) {
            var loadedCheckins = this.state.checkins.get(this.state.userId);
            if (loadedCheckins) {
                userCheckins = filterUserCheckins(loadedCheckins);
            }
        }


        return (
            <Modal
                style={{
                    padding: 10,
                    backgroundColor: 'transparent'
                }}
                easing={Easing.elastic(0)}
                position={'bottom'}
                coverScreen={true}
                ref='userCheckinsModal'>
                <Card style={{
                    flex: 0,
                    borderTopWidth: 0,
                    maxHeight: "100%",
                    overflow: "hidden"
                }}>
                    <View>

                        <CardItem header style={{
                            paddingTop: 0,
                            paddingBottom: 12,
                            borderTopWidth: 0,
                            backgroundColor: "#3F51B5",
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0
                        }}>
                            <Body style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderBottomColor: 'transparent',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Thumbnail
                                    style={{
                                        marginTop: 10,
                                    }}
                                    source={{
                                        // TODO store URL somewhere
                                        uri: 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                    }} size={5} />

                                <Text style={{ paddingLeft: 10, paddingTop: 10, flex: 1, color: "white" }}>
                                    {userCheckins.userName}
                                </Text>
                            </Body>
                        </CardItem>
                    </View>

                    <ScrollView>
                        <CardItem header bordered style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                            overflow: "hidden"
                        }}>
                            <Body style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderBottomColor: 'transparent',
                                alignItems: 'center'
                            }}>
                                <ScrollableTabView
                                    style={{ marginTop: 10, }}
                                    renderTabBar={() => <ScrollableTabBar />}
                                >
                                    <UserCheckinList {...{
                                        tabLabel: "Approved Checkins",
                                        checkins: userCheckins.approvedCheckins ? userCheckins.approvedCheckins : [],
                                        key: 0
                                    }}
                                    />
                                    <UserCheckinList {...{
                                        tabLabel: "Pending Checkins",
                                        checkins: userCheckins.pendingCheckins ? userCheckins.pendingCheckins : [],
                                        key: 1
                                    }}
                                    />
                                </ScrollableTabView>
                            </Body>
                        </CardItem>
                    </ScrollView>
                </Card>
            </Modal>
        );
    }
}