import { Controller, UseGuards, Get, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UploadDto, IUploadService } from '@points/shared';
const gm = require('gm').subClass({ imageMagick: true });
import * as sizeOf from 'image-size';

import { ApiAction, ApiPermission, PermissionGaurd, HasPermission } from '../core/acl';
import { UploadService } from './upload.service';
import { UploadFileSettings, uploadDir } from '../app.settings';

const resource = 'upload';
export const to = (action: ApiAction) => new ApiPermission(action, resource, 'userId', 'objectId');

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class UploadController implements IUploadService {
    constructor(private readonly upload: UploadService) { }

    @Post()
    @HasPermission(to('create'))
    // TODO restrict to only images
    @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
    async create(@Body() upload: UploadDto, @UploadedFile() photo, @Res() res): Promise<UploadDto> {
        if (!!photo) {
            upload.photo = photo.filename;
            this.generateThumbnail(upload.photo);
            this.generateMedium(upload.photo);
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

    private generateThumbnail(fileName: string) {
        const fileLocation = uploadDir + '/' + fileName;
        const thumbnail = uploadDir + '/thumb/' + fileName;
        const dimensions = sizeOf(fileLocation);

        gm(fileLocation)
            .crop(300, 300, dimensions.width / 2 - 150, dimensions.height / 2 - 150)
            .resize(100, 100)
            .gravity("Center")
            .quality(10)
            .noProfile()
            .write(thumbnail, function (err) {

            });
    }

    private generateMedium(fileName: string) {
        const fileLocation = uploadDir + '/' + fileName;
        const thumbnail = uploadDir + '/medium/' + fileName;
        
        gm(fileLocation)
            .quality(25)
            .write(thumbnail, function (err) {

            });
    }

}
