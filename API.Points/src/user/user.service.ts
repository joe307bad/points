import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as ac from 'accesscontrol';

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
    @Inject('AccessControl') private readonly access: ac.AccessControl,
    @Inject('User') private readonly userModel: Model<User>,
    private auth: AuthService) { }

  async create(userDto: UserDto): Promise<JwtResponse> {
    // restrict user from posting roles array
    const permission = this.access.can('admin').create('user');
    const user = new this.userModel(userDto);
    return this.db.save(user).then(newUser => this.auth.createToken(newUser));
  }

  async login(user: UserDto): Promise<JwtResponse | ApiError> {
    const userData = await this.findByUserName(user.userName);

    return bcrypt.compare(user.password, userData.password)
      .then(res => res
        ? this.auth.createToken(userData)
        : Promise.reject(new ApiError('Incorrect password')));
  }

  private async findByUserName(userName: string): Promise<User> {
    return await this.userModel.findOne({ userName });
  }
}
