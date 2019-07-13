import { Injectable, NestMiddleware } from '@nestjs/common';
import * as tamper from 'tamper';
import { AccessControl, Permission } from 'accesscontrol';
import { decodeToken } from '../acl';

// TODO this turned out to be a lot messier than I thought it would be
// it may be better to just append a filter method to every controller result
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly access: AccessControl) {}

  async use(req: Request, res: Response, next: Function) {

    const auth = req.headers['authorization'];
    if(!auth) {
      next();
      // return;
    }
    // const user = decodeToken(auth);
    // let intent = res.headers['X-Api-Intent'];
    // let owned = res.headers['X-Owns-Resource'];

    // if (intent && user && user.roles) {
    //   intent = JSON.parse(intent);
    //   const roles = user.roles;
    //   owned = owned === 'true';

    //   const permission: Permission = this.access
    //     .can(roles)
    //     [intent.action + (owned ? 'Own' : '')](intent.resource);

    //   if (permission.granted) {
    //     next();
    //   }

    //   let body = JSON.parse(await req.json());
    //   body = permission.filter(body);
    //   body = JSON.stringify(body);
    // }
    next();
  }
}
