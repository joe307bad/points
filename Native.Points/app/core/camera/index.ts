import ImagePicker from 'react-native-image-picker';

export interface IPhotoData {
    name?: string;
    location?: string;
    base64?: string;
    height?: number;
    width?: number;
    type?: string;
    error?: string;
    didCancel?: boolean;
}

const CameraOptions = {
    title: 'Upload a photo',
    storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        waitUntilSaved: true
    }
};

const Camera = {
    takePhoto: (callBack: (photoData: IPhotoData) => void): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            ImagePicker.showImagePicker(CameraOptions, (response) => {

                const photoData: IPhotoData = {};

                if (response.didCancel) {
                    photoData.didCancel = true;

                } else if (response.error) {
                    photoData.error = response.error;

                } else if (response.customButton) {

                } else {
                    photoData.base64 = response.data;
                    photoData.location = response.uri;
                    photoData.height = response.height;
                    photoData.width = response.width;
                    photoData.name = response.fileName;
                    photoData.type = response.type;
                }

                resolve(callBack(photoData));
            });
        });
    }
};

export default Camera;
