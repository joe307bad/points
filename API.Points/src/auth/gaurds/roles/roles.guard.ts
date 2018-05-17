import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // get user role
        // get request method (put, get, post, etc)
        // get resource attempting to be acted on
        // use access control to determine ac.cam(role).{method based on http method}(resource)
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // if (!roles) {
        //     return true;
        // }
        const request = context.switchToHttp().getRequest();
        // const user = request.user;
        // const hasRole = () => user.roles.some((role) => roles.some(r => r === role));
        // return user && user.roles && hasRole();
        return true;
    }
}
