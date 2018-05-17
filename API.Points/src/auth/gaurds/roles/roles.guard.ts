import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // if (!roles) {
        //     return true;
        // }
        // const request = context.switchToHttp().getRequest();
        // const user = request.user;
        // const hasRole = () => user.roles.some((role) => roles.some(r => r === role));
        // return user && user.roles && hasRole();
        return true;
    }
}
