import { IUploadService, UploadDto } from '@points/shared';
import { forOwn } from 'lodash';

import { http } from '../../core/http';
import { IPhotoData } from '../../core/camera';

// TODO centralize these API urls
const UPLOAD_API_URL = 'upload/';

export class UploadService implements IUploadService {

    private static instance: UploadService;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public create(upload: UploadDto, photoData: IPhotoData): Promise<UploadDto> {
        const formData = this.uploadToFormData(upload, photoData);
        return http.post(UPLOAD_API_URL, formData, true);
    }

    public getAll(): Promise<UploadDto[]> {
        return http.get(UPLOAD_API_URL);
    }

    private uploadToFormData(upload: UploadDto, photoData: IPhotoData): FormData {
        const form = new FormData();
        forOwn(upload, (value, key) => {
            form.append(key, value);
        });
        form.append('photo', {
            uri: photoData.location,
            type: photoData.type,
            name: photoData.name
        });
        return form;
    }

}

export const uploadService = UploadService.Instance;
