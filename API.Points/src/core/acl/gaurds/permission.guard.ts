import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// TODO change all instance of this to import { AccessControl } from 'accesscontrol'
import * as ac from 'accesscontrol';

import { JwtPayload } from '../../../auth';
import { ApiPermission } from '../api';
import { decodeToken } from '../helpers';
import { ApiIntentHeader, OwnsHeader } from '../../../app.settings';

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
        // const response = context.switchToHttp().getResponse();

        // response.header(ApiIntentHeader, JSON.stringify(intent));

        const user = decodeToken(request);

        if (!user || !user.roles) {
            return false;
        }

        let own = false;
        const hasBody = !!request.body && !!Object.keys(request.body).length;

        const roles = user.roles;
        const permission = (action: string, owned: boolean): ac.Permission =>
            (this.access.can(roles))[action + (owned ? 'Own' : '')](intent.resource);

        if (hasBody) {
            if (!!request.params && !!request.params.id) {
                // TODO this should probably be in an interceptor
                request.body.id = request.params.id;
            }

            own = intent.ownId ? intent.owned(request.body, user.id) : false;

            request.body = permission(intent.action, own).filter(request.body);
        }

        // response.header(OwnsHeader, own);
        return permission(intent.action, own).granted;
    }

}
