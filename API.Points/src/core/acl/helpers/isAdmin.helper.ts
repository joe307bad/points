import { decodeToken } from './decodeToken.helper';

export function isAdmin(request: any): boolean {
    const user = decodeToken(request)
    return user.roles.some(role => role === "admin");
}
