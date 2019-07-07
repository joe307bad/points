import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UserDto,
  JwtResponse,
  ApiError,
  IUserService,
  UserExistsDto
} from '@points/shared';

import { User } from '../shared/interfaces';
import { DatabaseService } from '../core/mongo/';
import { AuthService } from '../auth';

@Injectable()
export class UserService implements IUserService {
  private db = DatabaseService;

  constructor(
    @Inject('User') private readonly userModel: Model<User>,
    private auth: AuthService
  ) {}

  async create(userDto: UserDto): Promise<JwtResponse> {
    userDto = Object.assign(userDto, {
      userName: userDto.userName.toLowerCase(),
      roles: undefined
    });
    const user = new this.userModel(userDto);
    return this.db.save(user).then(newUser => this.auth.createToken(newUser));
  }

  async login(userDto: UserDto): Promise<JwtResponse | ApiError> {
    const userData = await this.findByUserName(userDto.userName);

    return bcrypt
      .compare(userDto.password, userData.password)
      .then(res =>
        res
          ? this.auth.createToken(userData)
          : Promise.reject(new ApiError('Incorrect password'))
      );
  }

  async exists(user: { userName: string }): Promise<UserExistsDto> {
    return this.userModel
      .count({ userName: user.userName.toLowerCase() })
      .then(numberOfUsers => ({ userExists: numberOfUsers > 0 }));
  }

  async getAll(): Promise<UserDto[]> {
    return await this.userModel.find().then(users =>
      users.map(
        user =>
          ({
            firstName: user.firstName,
            id: user._id,
            lastName: user.lastName,
            approved: user.approved
          } as UserDto)
      )
    );
  }

  private async findByUserName(userName: string): Promise<UserDto> {
    return (await this.userModel
      .findOne({ userName })
      .select('+password')) as UserDto;
  }

  async update(
    user: UserDto,
    params?: { id: string }
  ): Promise<UserDto | ApiError> {
    return (await this.userModel.findOneAndUpdate({ _id: params.id }, user, {
      new: true
    })) as UserDto;
  }
}
