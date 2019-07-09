import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadDto, IUploadService } from '@points/shared';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as isImage from 'is-image-filename';

import { Upload, User } from '../shared/interfaces';
import { DatabaseService } from '../core/mongo';
import { uploadDir } from '../app.settings';

@Injectable()
export class UploadService {

    private db = DatabaseService;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Upload') private readonly uploadModel: Model<Upload>) { }

    async create(uploadDto: UploadDto): Promise<Upload> {
        const upload = new this.uploadModel(uploadDto);
        return this.db.save(upload);
    }

    async getAll(): Promise<UploadDto[]> {
        return this.buildUserUploadAggregate()
            .then(uploads => uploads.filter(upload => {
                const url = `${uploadDir}/${upload.photo}`;
                return isImage(url) && fs.existsSync(url);
            }));
    }

    private buildUserUploadAggregate(): Promise<UploadDto[]> {

        const pipeline =
            [{
                '$lookup': {
                    'from': this.userModel.collection.name,
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'users'
                }
            },
            { '$sort': { 'createdAt': -1 } },
            {
                '$project': {
                    'photo': '$$ROOT.photo',
                    'title': '$$ROOT.title',
                    'description': '$$ROOT.description',
                    'createdAt': '$$ROOT.createdAt',
                    'user': {
                        '$let': {
                            'vars': {
                                'firstUser': {
                                    '$arrayElemAt': ['$users', 0]
                                }
                            },
                            'in': {
                                'firstName': '$$firstUser.firstName',
                                'userName': '$$firstUser.userName'
                            }
                        }
                    }
                }
            }];

        return this.uploadModel.aggregate(pipeline).exec();
    }
}
