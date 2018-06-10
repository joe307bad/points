import { Controller, UseGuards, Get, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UploadDto, IUploadService } from '@points/shared';

import { ApiAction, ApiPermission, PermissionGaurd, HasPermission } from '../core/acl';
import { UploadService } from './upload.service';
import { UploadFileSettings } from '../app.settings';

const resource = 'upload';
export const to = (action: ApiAction) => new ApiPermission(action, resource, 'userId', 'objectId');

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class UploadController implements IUploadService {
    constructor(private readonly upload: UploadService) { }

    @Post()
    @HasPermission(to('create'))
    @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
    async create(@Body() upload: UploadDto, @UploadedFile() photo, @Res() res): Promise<UploadDto> {
        if (!!photo) {
            upload.photo = photo.filename;
            return res.send(await this.upload.create(upload).catch(err => err));
        } else {
            return res.status(404).send('Not found');
        }
    }

    @Get()
    @HasPermission(to('create'))
    async getAll(): Promise<UploadDto[]> {
        return await this.upload.getAll().catch(err => err);
    }

}
