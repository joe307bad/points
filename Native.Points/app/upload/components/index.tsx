import ImagePicker from 'react-native-image-picker';
import React, { Component } from 'react';
import { Container } from 'native-base';

import { IBaseProps } from '../../navigation/components';
import { Toolbar } from '../../shared/components/header';

export class Upload extends Component<IBaseProps> {

    options = {
        title: 'Upload a photo',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    public render(): JSX.Element {

        return (
            <Container>
                <Toolbar
                    {...this.props}
                    camera
                    cameraHandler={() => {
                        ImagePicker.showImagePicker(this.options, (response) => {
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

                                debugger;
                            }
                        });
                    }} />
            </Container>
        );
    }
}
