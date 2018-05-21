import { ReflectMetadata } from '@nestjs/common';

import { ApiPermission } from '../api';

export const HasPermission = (permission: ApiPermission) =>
    ReflectMetadata('permission', permission);
