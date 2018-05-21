import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as ac from 'accesscontrol';
import { JwtPayload } from '../../../auth';
import { ApiPermission } from './permission.decorator';

@Injectable()
export class PermissionGaurd implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly access: ac.AccessControl) { }

    canActivate(context: ExecutionContext): boolean {
        // get user role
        // get request method (put, get, post, etc) --> i dont think this is necessary
        // get resource attempting to be acted on --> can only seem to get close to the type by doing this.constructor.name
        // get the attributes of the resource to be acted on (check if undefined?)
        // use access control to determine ac.cam(role).{method based on http method}(resource, attributes)
        const request = context.switchToHttp().getRequest();
        const user = this.decodeToken(request);
        const roles = user.roles;
        const intent = this.reflector.get<ApiPermission>('permission', context.getHandler());
        // const permission = this.access.can('admin').create('user');
        const can = () => this.access.can(roles);

        const permission = (() => {
            switch(intent.action){
                case 'create':
                    return can().create(intent.resource);
                case 'read':
                    return can().read(intent.resource);
                case 'update':
                    return can().update(intent.resource);
                case 'delete':
                    return can().delete(intent.resource);
            }
        })();

        // const request = context.switchToHttp().getRequest();
        // const method = request.method;
        // const user = this.decodeToken(request);
        // const roles = user.roles;

        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // if (!roles) {
        //     return true;
        // }
        // const user = request.user;
        // const hasRole = () => user.roles.some((role) => roles.some(r => r === role));
        // return user && user.roles && hasRole();
        return true;
    }

    private decodeToken(request: any): JwtPayload {
        const token = !!request.header ? request.headers.authorization.split(' ')[1] : null;
        return !!token ? jwt.decode(token) : null;
    }
}
