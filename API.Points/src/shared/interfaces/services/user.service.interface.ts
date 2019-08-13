import { UserDto, ApiError, JwtResponse, UserExistsDto } from '@points/shared';
import { User } from '../../models/user/user.model';

export interface IUserService {
    create(user: User, photo: any): Promise<JwtResponse>;
    login(user: UserDto): Promise<JwtResponse | ApiError>;
    update(user: UserDto, params?: { id: string }): Promise<UserDto | ApiError>;
    exists({ userName: string }): Promise<UserExistsDto>;
    getAll(): Promise<UserDto[]>;
}
