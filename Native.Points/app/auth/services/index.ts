import { IUserService, UserDto, JwtResponse, ApiError } from '@points/shared';

export class UserService implements IUserService {

    private static _instance: UserService;

    private constructor(){ }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    create(user: UserDto, photo: any): Promise<JwtResponse> {
        throw new Error("Method not implemented.");
    }

    login(user: UserDto): Promise<JwtResponse | ApiError> {
        debugger;
        return new Promise((resolve, reject) => setTimeout(() =>
            resolve({
                expiresIn: 8600,
                accessToken: 'access-token'
            }), 3000));
    }

    update(user: UserDto, params?: { id: string; } | undefined): Promise<UserDto | ApiError> {
        throw new Error("Method not implemented.");
    }
}

export default UserService.Instance;