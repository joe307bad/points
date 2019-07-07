import { SetMetadata } from '@nestjs/common';

import { ApiPermission } from '../api';

export const HasPermission = (permission: ApiPermission) =>
    SetMetadata('permission', permission);
