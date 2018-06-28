import React, { Component } from 'react'
import { Easing, Image, ScrollView, } from 'react-native';
import { Card, CardItem, Button, Icon, Body, View, Text } from 'native-base';
import Modal from 'react-native-modalbox';

import { IPhotoData } from '../../core/camera';

export class UploadPreview extends Component<{ photo: IPhotoData }> {

    public state = {
        imagePreviewWidth: 0,
        scrollViewHeight: 0
    }

    render(): JSX.Element {
        return (
            <Modal
                style={{ height: 'auto', maxHeight: '100%', padding: 10, backgroundColor: 'transparent' }}
                easing={Easing.elastic(0)}
                coverScreen={true}
                swipeToClose={false}
                ref='uploadPreviewModal'>
                <ScrollView style={{ height: 'auto' }}>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Body style={{ width: '100%' }}>
                                <View
                                    onLayout={(event) => {
                                        const { height, width } = event.nativeEvent.layout;
                                        this.setState({
                                            imagePreviewWidth: width
                                        })
                                    }}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: this.props.photo.height,
                                            width: this.state.imagePreviewWidth
                                        }}
                                        source={{ uri: this.props.photo.location }}
                                    />
                                </View>
                                <Button
                                    style={{ marginTop: 15 }} full>
                                    <Icon type='Entypo' name='upload' />
                                    <Text>Upload</Text>
                                </Button>
                                <Button
                                    onPress={() => (this.refs.uploadPreviewModal as any).close()}
                                    style={{ marginTop: 15 }} full danger>
                                    <Icon type='Entypo' name='circle-with-cross' />
                                    <Text>Cancel</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </ScrollView>
            </Modal>
        );
    }
}