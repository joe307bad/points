// @ts-ignore
import ImageBrowser from 'react-native-interactive-image-gallery'
import ImagePicker from 'react-native-image-picker';
import React, { Component } from 'react';
import { Container, Card, CardItem, Left, Body, Text, Button, Icon, View } from 'native-base';
import Modal from 'react-native-modalbox';
import { Easing, Image, ScrollView } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { IBaseProps } from '../../navigation/components';
import { Toolbar } from '../../shared/components/header';
import { IUploadState, initialState } from '../reducers';
import { IUploadProps } from '../containers';
import { completedUploadListRequest } from '../selectors';
import { UploadDto } from '@points/shared';

// interface ISelectedPhoto {
//     location: string;
//     base64: string;
//     height: number;
//     width: number;
//     type?: string;
// }

// interface IUploadState {
//     selectedPhoto: ISelectedPhoto;
// }

export class Upload extends Component<IUploadProps, IUploadState> {

    private formData: FormData = new FormData();
    private uploadPreview?: Modal;
    public cameraOptions = {
        title: 'Upload a photo',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    private completedUploadListRequestSubscription?: Subscription;
    public state: IUploadState = initialState.condition
        ? initialState.condition
        : {} as IUploadState;

    public componentWillMount() {
        if (!this.props.uploadList.length) {
            this.props.getUploadList();
        }

        this.completedUploadListRequestSubscription =
            completedUploadListRequest()
                .pipe(skip(1))
                .subscribe(requestCompleted => {
                    this.setState({
                        refreshing: !requestCompleted
                    })
                });
    }

    public componentWillUnmount() {
        this.completedUploadListRequestSubscription!.unsubscribe();
    }

    public render(): JSX.Element {

        const imageURLs: Array<Object> = this.props.uploadList.map(
            (img: UploadDto, index: number) => ({
                URI: 'https://p.jbad.io/uploads/' + img.photo,
                thumbnail: 'https://p.jbad.io/uploads/' + img.photo,
                id: String(index),
                title: img.title,
                description: img.description
            })
        )

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

                                // // You can also display the image using data:
                                // // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                // // debugger;
                                // this.setState({
                                //     selectedPhoto: {
                                //         base64: response.data,
                                //         location: response.uri,
                                //         height: response.height,
                                //         width: response.width,
                                //         type: response.type
                                //     }
                                // });
                                // this.formData = new FormData();
                                // this.formData.append('userId', '5b0ec065f1c0a5001b69ff22');
                                // this.formData.append('photo', {
                                //     uri: response.uri,
                                //     type: response.type, // or photo.type
                                //     name: response.fileName
                                // });
                                // const config = {
                                //     headers: {
                                //         'Content-Type': 'multipart/form-data',
                                //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZTMwN2JhZCIsImlkIjoiNWIwZWMwNjVmMWMwYTUwMDFiNjlmZjIyIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNTMwMDI5ODM5LCJleHAiOjE1MzAxMTYyMzl9._HpQUec7fGDpl2GGTJzMPgW0yf-QOYCvj2tzmLA6kq0'
                                //     }
                                // }
                                // debugger;
                                // axios.post('https://p.jbad.io/upload', this.formData, config)
                                //     .then(response => {
                                //         debugger;
                                //     })
                                //     .catch(respone => {
                                //         debugger;
                                //     });

                                // this.uploadPreview!.open();
                            }
                        });
                    }} />
                {/* <UploadPreview photo={this.state.selectedPhoto} ref='uploadPreview' /> */}
                <ImageBrowser images={imageURLs} />
            </Container>
        );
    }
}


// export class UploadPreview extends Component<{ photo: ISelectedPhoto }> {

//     public state = {
//         imagePreviewWidth: 0,
//         scrollViewHeight: 0
//     }

//     render(): JSX.Element {
//         return (
//             <Modal
//                 style={{ height: 'auto', maxHeight: '100%', padding: 10, backgroundColor: 'transparent' }}
//                 easing={Easing.elastic(0)}
//                 coverScreen={true}
//                 swipeToClose={false}
//                 ref='uploadPreviewModal'>
//                 <ScrollView style={{ height: 'auto' }}>
//                     <Card style={{ flex: 0 }}>
//                         <CardItem>
//                             <Body style={{ width: '100%' }}>
//                                 <View
//                                     onLayout={(event) => {
//                                         const { height, width } = event.nativeEvent.layout;
//                                         this.setState({
//                                             imagePreviewWidth: width
//                                         })
//                                     }}
//                                     style={{
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         width: '100%',
//                                     }}>
//                                     <Image
//                                         resizeMode="contain"
//                                         style={{
//                                             height: this.props.photo.height,
//                                             width: this.state.imagePreviewWidth
//                                         }}
//                                         source={{ uri: this.props.photo.location }}
//                                     />
//                                 </View>
//                                 <Button
//                                     style={{ marginTop: 15 }} full>
//                                     <Icon type='Entypo' name='upload' />
//                                     <Text>Upload</Text>
//                                 </Button>
//                                 <Button
//                                     onPress={() => (this.refs.uploadPreviewModal as any).close()}
//                                     style={{ marginTop: 15 }} full danger>
//                                     <Icon type='Entypo' name='circle-with-cross' />
//                                     <Text>Cancel</Text>
//                                 </Button>
//                             </Body>
//                         </CardItem>
//                     </Card>
//                 </ScrollView>
//             </Modal>
//         );
//     }
// }
