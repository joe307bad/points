import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { UserDto } from '../shared/dtos';
import { User, Role } from '../shared/interfaces';
import { UserSchema, RoleSchema } from '../shared/schemas';
import { DatabaseService } from '../core/mongo/';
import { AuthService } from '../auth';
import { JwtResponse } from '../auth/interfaces/';
import { ApiError } from '../core/error';

@Injectable()
export class UserService {

  private db = DatabaseService;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Role') private readonly roleModel: Model<Role>,
    private auth: AuthService) { }

  async create(userDto: UserDto): Promise<JwtResponse> {
    const user = new this.userModel(userDto);

    /// TODO im not sure if this is the correct way to add a default role to a user
    /// in other words, how do we a specify a default for a many to many relationship
    const role = new this.roleModel({name: "User"});
    ///

    return await this.db.save(role).then(role => {
      user.roles.push(role);
      return this.db.save(user).then(newUser => this.auth.createToken(newUser));
    });
  }

  async login(user: UserDto): Promise<JwtResponse | ApiError>{
    const userData = await this.findByUserName(user.userName);

    return bcrypt.compare(user.password, userData.password)
      .then(res => res
        ? this.auth.createToken(userData)
        : Promise.reject(new ApiError('Incorrect password')));
  }

  private async findByUserName(userName: string): Promise<User> {
    return await this.userModel.findOne({ userName }).populate('roles');
  }
}