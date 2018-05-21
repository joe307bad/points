import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Checkin } from '../shared/interfaces';

@Injectable()
export class CheckinService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>) { }

}
