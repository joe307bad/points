import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserDto } from '../shared/dtos';
import { User } from '../shared/interfaces';
import { DatabaseService } from '../core/mongo/';
import { AuthService } from '../auth';
import { JwtResponse } from '../auth/interfaces/';
import { ApiError } from '../core/error';

@Injectable()
export class UserService {

  private db = DatabaseService;

  constructor(
    @Inject('User') private readonly userModel: Model<User>,
    private auth: AuthService) { }

  async create(userDto: UserDto): Promise<JwtResponse> {
    // TODO restrict user from posting roles array
    const user = new this.userModel(userDto);
    return this.db.save(user).then(newUser => this.auth.createToken(newUser));
  }

  async login(userDto: UserDto): Promise<JwtResponse | ApiError> {
    const userData = await this.findByUserName(userDto.userName);

    return bcrypt.compare(userDto.password, userData.password)
      .then(res => res
        ? this.auth.createToken(userData)
        : Promise.reject(new ApiError('Incorrect password')));
  }

  private async findByUserName(userName: string): Promise<User> {
    return await this.userModel.findOne({ userName });
  }
}
