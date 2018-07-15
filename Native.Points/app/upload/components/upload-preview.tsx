import React, { Component } from 'react';
import { Easing, Image, ScrollView, } from 'react-native';
import { Icon, View, Text, Form, Item, Input, Button } from 'native-base';
import Modal from 'react-native-modalbox';

import { IPhotoData } from '../../core/camera';

export class UploadPreview extends Component<{
    photo: IPhotoData
    uploadHandler: () => void,
    updateTitle: any,
    updateDescription: any
}> {

    public state = {
        imagePreviewWidth: 0,
        scrollViewHeight: 0
    };

    public render(): JSX.Element {
        return (
            <Modal
                style={{ height: 'auto', maxHeight: '100%', padding: 10, backgroundColor: 'transparent' }}
                easing={Easing.elastic(0)}
                //coverScreen={true}
                position='bottom'
                swipeToClose={false}
                ref='uploadPreviewModal'>

                <ScrollView>
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        {/* <View
                            onLayout={(event) => {
                                const { width } = event.nativeEvent.layout;
                                this.setState({
                                    imagePreviewWidth: width
                                });
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: this.props.photo.height,
                                    width: this.state.imagePreviewWidth
                                }}
                                source={{ uri: this.props.photo.location }}
                            />
                        </View> */}
                        <View>
                            <Form>
                                <Item>
                                    <Input placeholder='Title' onChange={this.props.updateTitle} />
                                </Item>
                                <Item last>
                                    <Input placeholder='Description' onChange={this.props.updateDescription} />
                                </Item>
                            </Form>
                            <Button
                                style={{ marginTop: 15 }}
                                onPress={() => this.props.uploadHandler()}
                                full>
                                <Icon type='Entypo' name='upload' />
                                <Text>Upload</Text>
                            </Button>
                            <Button
                                onPress={() => (this.refs.uploadPreviewModal as any).close()}
                                style={{ marginTop: 15 }} full danger>
                                <Icon type='Entypo' name='circle-with-cross' />
                                <Text>Cancel</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}
