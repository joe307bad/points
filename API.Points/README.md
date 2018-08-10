## API.Points
### Node/[NestJS](https://nestjs.com) REST API for adding achievements, checking into achievements, uploading photos, and many other features.

###### Technical Features:
* Progressvive [Node](https://nodejs.org/en/) framework NestJS. This framework was inspired by [Angular](https://angular.io/) and wraps [Typescript](https://www.typescriptlang.org/) around [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) for storage and [Mongoose](http://mongoosejs.com/) for object mapping
* [AccessControl](https://onury.io/accesscontrol/) for attribute based access control
* [Passport](http://www.passportjs.org/) and [JWT](https://jwt.io/) for token authentication
---
### ToDos
- [ ] Add "check" endpoint for pingdom monitoring
- [ ] Implement flow for approving users and not automatically granting a token
- [ ] Generate documentation
    - https://stackoverflow.com/questions/18626191/node-js-or-express-js-rest-api-document-generator
- [ ] Gulp task to update shared project (delete folder in node modules, build shared project, npm install Shared)

### Advanced ToDos
- [ ] Websocket leaderboard/notifications
- [ ] Multitenancy
- [ ] Revoking JWT tokens with some event based system
- [ ] Created/updated by
- [ ] Validate model before uploading photo
- [ ] Restrict uploads behind ACL
- [ ] Partial match search for achievements using $regex
- [ ] Decouple endpoints from photo uploads
    - The reason for this is that the permissions gaurd is unable to parse the req.body of a multipart form request
    - the req.body is important because this determines if entity is owned by the user