import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserDto } from '../shared/dtos';
import { User } from '../shared/intefaces';
import { UserSchema } from '../shared/schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const user = new this.userModel(userDto);
    return await user.save();
  }
}