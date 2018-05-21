import { ReflectMetadata } from '@nestjs/common';

export type ApiAction = 'create' | 'read' | 'update' | 'delete';

export type ApiResource = 'user';

export class ApiPermission {
    action: ApiAction;
    resource: ApiResource;
    ownId: any;
    ownType: any;

    constructor(action: ApiAction, resource: ApiResource, ownId: any, ownType: any) {
        this.action = action;
        this.resource = resource;
        this.ownId = ownId;
        this.ownType = ownType;
    }

    owned(entity: any, userId: string): boolean {
        switch (this.ownType) {
            case 'integer':
                return entity[this.ownId].toString() === userId;
        }
    }

}

export const HasPermission = (permission: ApiPermission) =>
    ReflectMetadata('permission', permission);
