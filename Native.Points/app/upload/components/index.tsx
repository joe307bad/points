// @ts-ignore
import ImageBrowser from 'react-native-interactive-image-gallery'
import ImagePicker from 'react-native-image-picker';
import React, { Component } from 'react';
import { Container, Card, CardItem, Left, Body, Text, Button, Icon, View } from 'native-base';
import Modal from 'react-native-modalbox';
import { Easing, Image, ScrollView } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { UploadDto } from '@points/shared';

import { IBaseProps } from '../../navigation/components';
import { Toolbar } from '../../shared/components/header';
import { IUploadState, initialState } from '../reducers';
import { IUploadProps } from '../containers';
import { completedUploadListRequest } from '../selectors';
import { IPhotoData } from '../../core/camera';
import { UploadPreview } from './upload-preview';

export class Upload extends Component<IUploadProps, IUploadState> {

    private uploadPreview?: Modal;

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

    public componentDidMount() {
        // @ts-ignore
        this.uploadPreview = this.refs.uploadPreview.refs.uploadPreviewModal;
    }

    public showPhotoPreview(photoData: IPhotoData) {
        this.setState({
            selectedPhoto: photoData
        });
        this.uploadPreview!.open();
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
                    cameraHandler={(photoData: IPhotoData) => this.showPhotoPreview(photoData)} />
                <UploadPreview photo={this.state.selectedPhoto} ref='uploadPreview' />
                <ImageBrowser images={imageURLs} />
            </Container>
        );
    }
}

//         // this.formData = new FormData();
//         // this.formData.append('userId', '5b0ec065f1c0a5001b69ff22');
//         // this.formData.append('photo', {
//         //     uri: response.uri,
//         //     type: response.type, // or photo.type
//         //     name: response.fileName
//         // });
//         // const config = {
//         //     headers: {
//         //         'Content-Type': 'multipart/form-data',
//         //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZTMwN2JhZCIsImlkIjoiNWIwZWMwNjVmMWMwYTUwMDFiNjlmZjIyIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNTMwMDI5ODM5LCJleHAiOjE1MzAxMTYyMzl9._HpQUec7fGDpl2GGTJzMPgW0yf-QOYCvj2tzmLA6kq0'
//         //     }
//         // }
//         // debugger;
//         // axios.post('https://p.jbad.io/upload', this.formData, config)
//         //     .then(response => {
//         //         debugger;
//         //     })
//         //     .catch(respone => {
//         //         debugger;
//         //     });