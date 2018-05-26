import { ApiAction } from './api.action';
import { ApiResource } from './api.resource';

export class ApiPermission {
    action: ApiAction;
    resource: ApiResource;
    ownId: any;
    ownType: any;

    constructor(action: ApiAction, resource: ApiResource, ownId?: any, ownType?: any) {
        this.action = action;
        this.resource = resource;
        this.ownId = ownId;
        this.ownType = ownType;
    }

    owned(entity: any, userId: string): boolean {
        switch (this.ownType) {
            case 'objectId':
                return entity[this.ownId] === userId;
        }
    }

}
