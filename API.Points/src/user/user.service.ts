import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { UserDto } from '../shared/dtos';
import { User } from '../shared/interfaces';
import { UserSchema } from '../shared/schemas';
import { DatabaseService } from '../core/mongo/';
import { AuthService } from '../auth';
import { JwtResponse } from '../auth/interfaces/';
import { ApiError } from '../core/error';

@Injectable()
export class UserService {

  private db = DatabaseService;

  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<User>,
    private auth: AuthService) { }

  async create(userDto: UserDto): Promise<JwtResponse> {
    const user = new this.userModel(userDto);
    return await this.db.save(user).then(newUser => this.auth.createToken(newUser));
  }

  async login(user: UserDto): Promise<JwtResponse | ApiError>{
    const userData = await this.findByUserName(user.userName);

    return bcrypt.compare(user.password, userData.password)
      .then(res => res
        ? this.auth.createToken(user as User)
        : Promise.reject(new ApiError('Incorrect password')));
  }

  private async findByUserName(userName: string): Promise<User> {
    return await this.userModel.findOne({ userName });
  }
}