import { IUserService, UserDto, JwtResponse, ApiError, UserExistsDto } from '@points/shared';

import { http } from '../../core/http';

const USERS_API_URL = 'user/';

export class UserService implements IUserService {

    private static instance: UserService;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public create(user: UserDto, photo: any): Promise<JwtResponse> {
        return http.post(USERS_API_URL, user);
    }

    public login(user: UserDto): Promise<JwtResponse | ApiError> {

        const url = USERS_API_URL + 'login/';
        return http.post<JwtResponse | ApiError>(url, user);
    }

    public update(user: UserDto, params?: { id: string; } | undefined): Promise<UserDto | ApiError> {
        debugger;
       const url = USERS_API_URL + params.id;
        return http.put<UserDto | ApiError>(url, user);
    }

    public exists(user: { userName: any; }): Promise<UserExistsDto> {
        return http.get(USERS_API_URL + 'exists/' + user.userName);
    }

    public getAll(): Promise<UserDto[]> {
        return http.get(USERS_API_URL);
    }
}

export const userService = UserService.Instance;
