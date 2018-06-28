import ImagePicker from 'react-native-image-picker';

export interface IPhotoData {
    location?: string;
    base64?: string;
    height?: number;
    width?: number;
    type?: string;
    error?: string;
    didCancel?: boolean;
}

const CamerOptions = {
    title: 'Upload a photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const Camera = {
    takePhoto: (callBack: (photoData: IPhotoData) => void): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            ImagePicker.showImagePicker(CamerOptions, (response) => {

                const photoData: IPhotoData = {
                    location: '',
                    base64: ''
                }

                if (response.didCancel) {
                    photoData.didCancel = true;
                }
                else if (response.error) {
                    photoData.error = response.error;
                }
                else if (response.customButton) {

                }
                else {
                    let source = { uri: response.uri };
                    photoData.base64 = response.data;
                    photoData.location = response.uri;
                    photoData.height = response.height;
                    photoData.width = response.width;
                }

                resolve(callBack(photoData));
            });
        })
    }
}

export default Camera;