// import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
// import * as tamper from 'tamper';
// import { AccessControl, Permission } from 'accesscontrol';
// import { decodeToken } from '../acl';

// // TODO this turned out to be a lot messier than I thought it would be
// // it may be better to just append a filter method to every controller result
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {

//     constructor(private readonly access: AccessControl) { }

//     resolve(...args: any[]): MiddlewareFunction {
//         const context = this;
//         return tamper(function (req, res) {
//             // only tamper with json responses
//             if (res.getHeader('Content-Type') !== 'application/json; charset=utf-8') {
//                 return;
//             }

//             return function (body) {
//                 const user = decodeToken(req);
//                 let intent = res.getHeader('X-Api-Intent');
//                 let owned = res.getHeader('X-Owns-Resource');

//                 if (intent && user && user.roles && owned) {
//                     intent = JSON.parse(intent);
//                     const roles = user.roles;
//                     owned = owned === 'true';

//                     const permission: Permission =
//                         (context.access.can(roles))[intent.action + (owned ? 'Own' : '')](intent.resource);

//                     if (!permission.granted) {
//                         return body;
//                     }

//                     body = JSON.parse(body);
//                     body = permission.filter(body);
//                     body = JSON.stringify(body);
//                 }

//                 return body;
//             };

//         });
//     }
// }
