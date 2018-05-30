### API.Points
##### Node/[NestJS](https://nestjs.com) REST API for adding achievements, checking into achievements, uploading photos, and many other features.
---
###### Technical Features:
* Progressvive Node framework NestJS. This framework was inspired by Angular and wraps Typescript around Express
* MongoDB for storage and Mongoose for object mapping
* [AccessControl](https://onury.io/accesscontrol/) for attribute based access control
* Passport and JWT for token authentication
---
### ToDos
- [ ] Endpoint to check validity of token for when the app is reopened after a period of time
- [ ] Set up environment variables
    - https://www.npmjs.com/package/gulp-env
- [ ] Generate documentation
    - https://stackoverflow.com/questions/18626191/node-js-or-express-js-rest-api-document-generator

### Advanced ToDos
- [ ] Websocket leaderboard/notifications
- [ ] Multitenancy
- [ ] Revoking JWT tokens with some event based system
- [ ] Created/updated by
- [ ] Validate model before uploading photo
- [ ] Restrict uploads behind ACL
- [ ] Partial match search for achievements using $regex
