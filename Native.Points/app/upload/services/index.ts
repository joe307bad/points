import { IUploadService, UploadDto } from '@points/shared';

import { http } from '../../core/http';

// TODO centralize these API urls
const UPLOAD_API_URL = 'upload/';

export class UploadService implements IUploadService {

    private static instance: UploadService;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public create(upload: UploadDto, photo: any, res: any): Promise<UploadDto> {
        throw new Error("Method not implemented.");
    }

    public getAll(): Promise<UploadDto[]> {
        return http.get(UPLOAD_API_URL);
    }

}

export const uploadService = UploadService.Instance;
