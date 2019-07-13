import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import {decodeToken} from '../../core/acl/helpers';

@Injectable()
export class OnlyApprovedUsers implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = decodeToken(request);
    return user.approved;
  }
}
