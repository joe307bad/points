### ToDos
- [x] ~~Encrypt/Decrypt password~~
- [x] ~~Login endpoint~~
- [x] ~~Roles gaurd~~
- [x] ~~Store JWT info in request via interceptor~~
- [x] ~~Access JWT info in Role Gaurd~~
- [x] ~~Figure out how to achieve roles/relationships in MongoDB/Mongoose~~
    - ~~http://mongoosejs.com/docs/populate.html~~
    - ~~many-to-many https://stackoverflow.com/a/1600166~~
- [ ] Rework role relations tp use $lookup and virtuals
    - https://stackoverflow.com/a/46020968
- [ ] Restrict roles gaurd by accessing roles in JWT payload
- [ ] Achievement entity with user many to many

### Advanced ToDos
- [ ] Cache role data
- [ ] Multitenancy