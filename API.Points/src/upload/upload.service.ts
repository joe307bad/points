import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadDto } from '@points/shared';
import { Model } from 'mongoose';

import { Upload, User } from '../shared/interfaces';
import { DatabaseService } from '../core/mongo';

@Injectable()
export class UploadService {

    private db = DatabaseService;

    constructor(
        @Inject('User') private readonly userModel: Model<User>,
        @InjectModel('Upload') private readonly uploadModel: Model<Upload>) { }

    async create(uploadDto: UploadDto): Promise<Upload> {
        const upload = new this.uploadModel(uploadDto);
        return this.db.save(upload);
    }

    async getAll(): Promise<Upload[]> {
        return this.buildUserUploadAggregate();
    }

    private buildUserUploadAggregate() {

        const pipeline =
            [{
                '$lookup': {
                    'from': this.userModel.collection.name,
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'users'
                }
            },
            {
                '$project': {
                    'photo': '$$ROOT.photo',
                    'title': '$$ROOT.title',
                    'description': '$$ROOT.description',
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
