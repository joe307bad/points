import { UserDto, ApiError, JwtResponse, UserExistsDto } from '../dtos';

export interface IUserService {
    create(user: UserDto, photo: any): Promise<JwtResponse>;
    login(user: UserDto): Promise<JwtResponse | ApiError>;
    update(user: UserDto, params?: { id: string }): Promise<UserDto | ApiError>;
    exists({ userName: string }): Promise<UserExistsDto>;
}
