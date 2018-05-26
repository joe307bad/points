import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as ac from 'accesscontrol';

import { JwtPayload } from '../../../auth';
import { ApiPermission } from '../api';

@Injectable()
export class PermissionGaurd implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly access: ac.AccessControl) { }

    canActivate(context: ExecutionContext): boolean {

        const intent = this.reflector.get<ApiPermission>('permission', context.getHandler());

        if (!intent) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = this.decodeToken(request);

        if (!user || !user.roles) {
            return false;
        }

        let attributes = null;
        let owned = false;
        let hasBody = !!request.body && !!Object.keys(request.body).length;

        const roles = user.roles;
        const permission = (action: string, owned: boolean): ac.Permission =>
            (this.access.can(roles))[action + (owned ? 'Own' : '')](intent.resource);

        if(hasBody){
            if (!!request.params && !!request.params.id) {
                // TODO this should probably be in an interceptor
                request.body.id = request.params.id;
            }
            owned = intent.ownId ? intent.owned(request.body, user.id) : false;
            request.body = permission(intent.action, owned).filter(request.body);
        }

        return permission(intent.action, owned).granted;
    }

    private decodeToken(request: any): JwtPayload {
        const token = !!request.headers && !!request.headers.authorization
            ? request.headers.authorization.split(' ')[1]
            : null;
        return !!token ? jwt.decode(token) : null;
    }
}
