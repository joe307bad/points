import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Checkin } from '../shared/interfaces';
import { CheckinDto, UserDto } from '../shared/dtos';

@Injectable()
export class CheckinService {

    private db = DatabaseService;

    constructor(@InjectModel('Checkin') private readonly checkinModel: Model<Checkin>) { }

    async create(checkinDto: CheckinDto): Promise<Checkin> {
        const checkin = new this.checkinModel(checkinDto);
        return this.db.save(checkin);
    }
}
