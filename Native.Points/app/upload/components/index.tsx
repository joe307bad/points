import ImagePicker from 'react-native-image-picker';
import React, { Component } from 'react';
import { Container, Card, CardItem, Left, Body, Text, Button, Icon, View } from 'native-base';
import Modal from 'react-native-modalbox';
import { Easing, Image } from 'react-native';

import { IBaseProps } from '../../navigation/components';
import { Toolbar } from '../../shared/components/header';
import { ScrollView } from 'react-native';

interface ISelectedPhoto {
    location: string;
    base64: string;
    height: number;
    width: number;
}

interface IUploadState {
    selectedPhoto: ISelectedPhoto;
}

export class Upload extends Component<IBaseProps, IUploadState> {

    private uploadPreview?: Modal;
    public cameraOptions = {
        title: 'Upload a photo',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    public state = {
        selectedPhoto: {} as ISelectedPhoto
    };

    public componentDidMount() {
        // @ts-ignore
        this.uploadPreview = this.refs.uploadPreview.refs.uploadPreviewModal;
    }

    public render(): JSX.Element {

        return (
            <Container>
                <Toolbar
                    {...this.props}
                    camera
                    cameraHandler={() => {
                        ImagePicker.showImagePicker(this.cameraOptions, (response) => {
                            console.log('Response = ', response);

                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            }
                            else if (response.error) {
                                console.log('ImagePicker Error: ', response.error);
                            }
                            else if (response.customButton) {
                                console.log('User tapped custom button: ', response.customButton);
                            }
                            else {
                                let source = { uri: response.uri };

                                // You can also display the image using data:
                                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                // debugger;
                                this.setState({
                                    selectedPhoto: {
                                        base64: response.data,
                                        location: response.uri,
                                        height: response.height,
                                        width: response.width
                                    }
                                })
                                this.uploadPreview!.open();
                            }
                        });
                    }} />
                <UploadPreview photo={this.state.selectedPhoto} ref='uploadPreview' />
            </Container>
        );
    }
}
export class UploadPreview extends Component<{ photo: ISelectedPhoto }> {

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
