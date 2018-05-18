import { ReflectMetadata } from '@nestjs/common';

export type ApiAction = 'create' | 'read' | 'update' | 'delete';

export class ApiResource {

}

export class ApiPermission {
    action: ApiAction;

    constructor(action: ApiAction) {
        this.action = action;
    }

}

export const HasPermission = (permission: ApiPermission) =>
    ReflectMetadata('permission', permission);
