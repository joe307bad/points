// @ts-ignore
import ImageBrowser from 'react-native-interactive-image-gallery';
import React, { Component } from 'react';
import { Container, } from 'native-base';
import Modal from 'react-native-modalbox';
import { ScrollView, RefreshControl } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { UploadDto } from '@points/shared';

import { Toolbar } from '../../shared/components/header';
import { IUploadState, initialState, IUserUpload } from '../reducers';
import { IUploadProps } from '../containers';
import { completedUploadListRequest, completedUserUploadRequest } from '../selectors';
import { IPhotoData } from '../../core/camera';
import { UploadPreview } from './upload-preview';
import { API_URL } from '../../App';

export class Upload extends Component<IUploadProps, IUploadState> {

    public state: IUploadState = initialState.condition
        ? initialState.condition
        : {} as IUploadState;
    private uploadPreview?: Modal;
    private completedUploadListRequestSubscription?: Subscription;
    private completedUserUploadRequestSubscription?: Subscription;

    public componentWillMount() {
        if (!this.props.uploadList.length) {
            this.props.getUploadList();
        }

        this.completedUploadListRequestSubscription =
            completedUploadListRequest()
                .pipe(skip(1))
                .subscribe((requestCompleted) => this.setState({
                    refreshing: !requestCompleted
                }));

        this.completedUserUploadRequestSubscription =
            completedUserUploadRequest()
                .pipe(skip(1))
                .subscribe((requestCompleted) => {
                    // TODO we should have to set refreshing in this block
                    // TODO seperate reducers for list and user-upload?
                    this.setState({
                        refreshing: !requestCompleted
                    });
                    this.uploadPreview!.close();
                });
    }

    public componentWillUnmount() {
        this.completedUploadListRequestSubscription!.unsubscribe();
        this.completedUserUploadRequestSubscription!.unsubscribe();
    }

    public componentDidMount() {
        // @ts-ignore
        this.uploadPreview = this.refs.uploadPreview.refs.uploadPreviewModal;
    }

    public showPhotoPreview(photoData: IPhotoData) {

        const userPhoto: IUserUpload = {
            photoData,
            userName: this.props.currentUser.userName,
            userId: this.props.currentUser.userId!
        };

        this.setState({
            userUpload: userPhoto
        });
        this.uploadPreview!.open();
    }

    public updateTitle = (title: string) => this.setState((prevState) => {
        prevState.userUpload.title = title;
    })

    public updateDescription = (description: string) => this.setState((prevState) => {
        prevState.userUpload.description = description;
    })

    public render(): JSX.Element {

        // TODO stop hardcoding URLs
        const imageURLs: object[] = this.props.uploadList.map(
            (img: UploadDto, index: number) => ({
                URI: API_URL + 'uploads/' + img.photo,
                thumbnail: API_URL + 'uploads/thumb/' + img.photo,
                id: String(index),
                title: img.title,
                description: img.description
            })
        );

        return (
            <Container>
                <Toolbar
                    {...this.props}
                    camera
                    cameraHandler={(photoData: IPhotoData) =>
                        this.showPhotoPreview(photoData)} />
                <ScrollView
                    style={{ width: '100%' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing!}
                            onRefresh={() => {
                                this.setState({
                                    refreshing: true
                                });
                                this.props.getUploadList();
                            }}
                        />
                    }>
                    <ImageBrowser style={{ width: '100%' }} images={imageURLs} />
                </ScrollView>
                <UploadPreview
                    ref='uploadPreview'
                    updateDescription={((event: any) => this.updateDescription(event.nativeEvent.text))}
                    updateTitle={((event: any) => this.updateTitle(event.nativeEvent.text))}
                    photo={this.state.userUpload.photoData}
                    uploadHandler={() => this.props.upload(this.state.userUpload)} />
            </Container>
        );
    }
}
