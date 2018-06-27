import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// TODO change all instance of this to import { AccessControl } from 'accesscontrol'
import * as ac from 'accesscontrol';

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
        const response = context.switchToHttp().getResponse();

        response.header(ApiIntentHeader, JSON.stringify(intent));

        const user = decodeToken(request);

        if (!user || !user.roles) {
            return false;
        }

        let own = false;
        const hasBody = !!request.body && !!Object.keys(request.body).length;

        if (!hasBody && !Object.keys(request.params).length) {
            // NOTE if there is no body, then this may be a multipart upload
            // TODO investigate a way to validate a multipart form without materializing fields
            return true;
        }

        const roles = user.roles;
        const permission = (action: string, owned: boolean): ac.Permission =>
            (this.access.can(roles))[action + (owned ? 'Own' : '')](intent.resource);

        if (hasBody) {
            if (!!request.params && !!request.params.id) {
                // TODO this should probably be in an interceptor
                // TODO as far as I can tell this is only for updating your own user
                // since every other id goes off userId (instead of id)
                request.body.id = request.params.id;
            }

            own = intent.ownId ? intent.owned(request.body, user.id) : false;

            request.body = permission(intent.action, own).filter(request.body);
        }

        response.header(OwnsHeader, own);
        return permission(intent.action, own).granted;
    }

}
