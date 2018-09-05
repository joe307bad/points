import { Component } from 'react';
import { Container, Text } from 'native-base';
import { FlatList } from 'react-native';
import { Checkins } from '../reducers';
import AchievementListItem from '../../shared/components/achievement-list-item/achievement-list-item';
import { AchievementDto } from '@points/shared';


export class UserCheckinList extends Component<{ checkins: Checkins[] }>{
    render(): JSX.Element {
        var _keyExtractor = (item: any, index: any) => {
            return item.checkin.achievementId;
        };
        return (
            <Container>
                {this.props.checkins.length ? <FlatList<Checkins>
                    style={{
                        height: 200,
                        marginLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0
                    }}
                    data={this.props.checkins}
                    keyExtractor={_keyExtractor}
                    renderItem={(achievement: { item: Checkins, index: number }) =>
                        <AchievementListItem achievement={{
                            achievementId: achievement.item.checkin.achievementId,
                            name: achievement.item.checkin.name,
                            points: achievement.item.totalPoints,
                            photo: achievement.item.checkin.photo,
                            checkins: [{}]
                        } as AchievementDto} />
                    }
                /> : <Text></Text>}
            </Container>)
    }
}