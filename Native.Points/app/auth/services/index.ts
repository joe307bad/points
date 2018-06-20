import { IUserService, UserDto, JwtResponse, ApiError } from '@points/shared';

import { http } from '../../core/http';

const USERS_API_URL = 'user/';

export class UserService implements IUserService {

    private static instance: UserService;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public create(user: UserDto, photo: any): Promise<JwtResponse> {
        throw new Error('Method not implemented.');
    }

    public login(user: UserDto): Promise<JwtResponse | ApiError> {

        const url = USERS_API_URL + 'login/';
        return http.post<JwtResponse | ApiError>(url, user);
    }

    public update(user: UserDto, params?: { id: string; } | undefined): Promise<UserDto | ApiError> {
        throw new Error('Method not implemented.');
    }
}

export const userService = UserService.Instance;
