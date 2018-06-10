import { UserDto, ApiError, JwtResponse } from "../dtos";

export interface IUserService {
    create(user: UserDto, photo: any): Promise<JwtResponse>;
    login(user: UserDto): Promise<JwtResponse | ApiError>;
    update(user: UserDto, params?: { id: string }):
}