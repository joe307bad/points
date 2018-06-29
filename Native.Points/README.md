## Native.Points
### [React Native](https://facebook.github.io/react-native/) application for adding and checking into achievements

##### Technical Features:
* React Native for native iOS/Android application development
* [Redux](https://redux.js.org/) for state management
* [Redux Saga](https://redux-saga.js.org/) for side effect management
* [Reselect](https://github.com/reduxjs/reselect) for memoized state selection
* [Redux Watch](https://github.com/jprichardson/redux-watch) for subscribing to and monitoring state changes
* [React Navigation](https://github.com/react-navigation/react-navigation) for routing 
* [Typescript](https://www.typescriptlang.org/) for a high level of structure and strong typing
* [NativeBase](https://github.com/GeekyAnts/NativeBase) UI toolkit
---
### MVP ToDos:
- [x] ~~Upload list pull to refresh~~
- [x] ~~Create upload action~~
    - With title and description https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
- [x] ~~Sort uploads by created date~~
- [ ] Register user
    - http://docs.nativebase.io/Components.html#success-textbox-headref
- [ ] Error modal triggered by core Http
- [ ] If JWT is invalid/expired, boot back to login screen
- [ ] Remember me functionality
- [ ] Logout functionality
- [ ] Achievement search functionality
- [ ] Some indicator that you have already checked into an achievement
    - Add user checkins to ILoginState
- [ ] Deploy to Android
- [ ] Deploy to iOS and Expo

### Post Beta ToDos:
- [ ] Seed endpoint accessible by admins to check for existing achievements and add if necessary
    - Download photos and save to jbhs-scripts projects
    - Transcribe all achievements on bachlr to json file
    - Alter points playbook to copy up json file and photos and run endpoint
- [ ] Flow to approve users instead of automatially granting access
- [ ] Manage Categories
- [ ] Manage Achievements
- [ ] Approve all functionality
- [ ] Checkin details and photo upload
- [ ] User profile page with personal feed and photo upload capabilities
- [ ] Implement back button with React Navigation code
    - https://github.com/react-navigation/react-navigation/blob/5e075e1c31d5e6192f2532a815b1737fa27ed65b/src/createNavigationContainer.js#L154
- [ ] React Navigation transitions
    - https://www.npmjs.com/package/react-navigation-transitions

### Advanced ToDos:	
- [ ] Integrate [Redux Persist](https://github.com/rt2zz/redux-persist)	
- [ ] Submit HTTP call with [MessagePack](https://msgpack.org/index.html)	
    - https://www.npmjs.com/package/body-parser-with-msgpack