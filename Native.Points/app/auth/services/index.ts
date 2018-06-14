import { IUserService, UserDto, JwtResponse, ApiError } from '@points/shared';

export class UserService implements IUserService {
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
    login1(user: UserDto): Promise<JwtResponse | ApiError> {
        debugger;
        return Promise.resolve({
            expiresIn: 8600,
            accessToken: 'access-token'
        })
    }
    update(user: UserDto, params?: { id: string; } | undefined): Promise<UserDto | ApiError> {
        throw new Error("Method not implemented.");
    }
}


// export function login(userName: string, password: string): Promise<boolean> {
//     return Promise.resolve(true);
// }