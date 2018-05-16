### ToDos
- [x] ~~Encrypt/Decrypt password~~
- [x] ~~Login endpoint~~
- [x] ~~Roles gaurd~~
- [x] ~~Store JWT info in request via interceptor~~
- [x] ~~Access JWT info in Role Gaurd~~
- [x] ~~Figure out how to achieve roles/relationships in MongoDB/Mongoose~~
    - ~~http://mongoosejs.com/docs/populate.html~~
    - ~~many-to-many https://stackoverflow.com/a/1600166~~
- [ ] Rework role relations to use $lookup and virtuals (or store )
    - https://stackoverflow.com/a/46020968
    - http://mongoosejs.com/docs/guide.html#virtuals
    - https://www.npmjs.com/package/mongoose-authorization
    - https://stackoverflow.com/questions/37283471/how-to-get-enum-values-from-mongoose-schema-using-virtual-method
- [ ] Alternative approach to roles:
    - use express acl https://www.npmjs.com/package/express-acl
    - implement it in nest middleware https://docs.nestjs.com/middleware
    - async looks cool too https://caolan.github.io/async/docs.html
    - https://github.com/patrickvaler/express-jwt-acl-mongoose-starter
    - recreate something like this? https://github.com/leafOfTree/simple-mongoose-rbac/blob/master/index.js
    - https://www.npmjs.com/package/accesscontrol
- [ ] Restrict roles gaurd by accessing roles in JWT payload
- [ ] Achievement entity with user many to many

### Advanced ToDos
- [ ] Cache role data
- [ ] Multitenancy