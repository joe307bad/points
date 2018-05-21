import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Achievement } from '../shared/interfaces';
import { AchievementDto } from '../shared/dtos';
import { JwtResponse } from '../auth';

@Injectable()
export class AchievementService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Achievement') private readonly achievmentModel: Model<Achievement>) { }

    async create(achievementDto: AchievementDto): Promise<Achievement> {
        const achievement = new this.achievmentModel(achievementDto);
        return this.db.save(achievement);
    }

    async getAll(): Promise<Achievement[]> {
        return this.achievmentModel.find({});
    }

    async update(achievementDto: AchievementDto): Promise<Achievement> {
        return this.achievmentModel.update({ _id: achievementDto.id }, achievementDto);
    }

}
