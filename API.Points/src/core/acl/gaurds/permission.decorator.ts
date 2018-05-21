import { ReflectMetadata } from '@nestjs/common';

export type ApiAction = 'create' | 'read' | 'update' | 'delete';

export type ApiResource = 'user';

export class ApiPermission {
    action: ApiAction;
    resource: ApiResource;

    constructor(action: ApiAction, resource: ApiResource) {
        this.action = action;
        this.resource = resource;
    }

}

export const HasPermission = (permission: ApiPermission) =>
    ReflectMetadata('permission', permission);
