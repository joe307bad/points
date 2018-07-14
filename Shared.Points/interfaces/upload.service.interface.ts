import { UploadDto } from '../dtos';

export interface IUploadService {
    create(upload: UploadDto, photo: any, res: any): Promise<UploadDto>;
    getAll(): Promise<UploadDto[]>;
}
