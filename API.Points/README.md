### ToDos
- [x] ~~Encrypt/Decrypt password~~
- [x] ~~Login endpoint~~
- [x] ~~Figure out how to achieve roles/relationships in MongoDB/Mongoose~~
- [x] ~~Utilize access control to lockdown service endpoints~~
- [x] ~~Restrict AccessControl gaurd by accessing roles in JWT payload~~
- [x] ~~Achievement entity with CRU operations~~
- [x] ~~Checkin entity with create operation~~
- [x] ~~Create join to calculate user's total points~~
    ~~- https://stackoverflow.com/a/46020968 (listing 3)~~
- [x] ~~Create join to get users who have checked in to achievement~~
- [x] ~~Add approved property to checkin joins~~
- [x] ~~Add controller methods for getting one users checkins and getting all checkins~~
- [x] ~~Join to get one achievement and all approved checkins for this achievement~~
- [x] ~~Leaderboard endpoint~~
- [x] ~~Upload photo with achievement~~
- [x] ~~Upload photo with checkin~~
- [x] ~~Upload photo with create user~~
- [x] ~~Generic upload endpoint~~
- [x] ~~Endpoint to serve up file~~
- [x] ~~Endpoint for admin to approve checkin~~
- [x] ~~Aggregate and endpoint that will return uploads and associated users~~
- [x] ~~Filter unnapproved checkins from points total~~
- [x] ~~Category capabilities for achievements~~
- [x] ~~Fix GetAll endpoint for Achievements~~
- [x] ~~Delete operations for Checkin~~
- [x] ~~Searching for achievements~~

### Advanced ToDos
- [ ] Websocket leaderboard/notifications
- [ ] Multitenancy
- [ ] Revoking JWT tokens with some event based system
- [ ] Created/updated by
- [ ] Validate model before uploading photo
- [ ] Restrict uploads behind ACL
- [ ] Partial match search for achievements using $regex