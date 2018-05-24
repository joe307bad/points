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
- [ ] Upload photo with checkin
- [ ] Upload photo with create user
- [ ] Endpoint for admin to approve checkin
- [ ] Endpoint to serve up file
- [ ] Filter unnapproved checkins from points total
- [ ] Category capabilities for achievements
- [ ] Update and delete operations for Checkin
- [ ] Paging for checkins and/or achievements

### Advanced ToDos
- [ ] Websocket leaderboard/notifications
- [ ] Multitenancy
- [ ] Revoking JWT tokens with some event based system
- [ ] Created/updated by