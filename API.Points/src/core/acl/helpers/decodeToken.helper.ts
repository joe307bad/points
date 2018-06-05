import { JwtPayload } from '../../../auth';
import * as jwt from 'jsonwebtoken';

export function decodeToken(request: any): JwtPayload {
    const token = !!request.headers && !!request.headers.authorization
        ? request.headers.authorization.split(' ')[1]
        : null;
    return !!token ? jwt.decode(token) : null;
}
