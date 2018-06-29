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
- [ ] Upload list pull to refresh
- [ ] Create upload action
- [ ] Sort uploads by created date
- [ ] Register user
- [ ] Error modal triggered by core Http
- [ ] Remember me functionality
- [ ] Logout functionality
- [ ] Achievement search functionality
- [ ] Some indicator that you have already checked into an achievement
- [ ] Deploy to Android
- [ ] Deploy to iOS and Expo

### Post Beta ToDos
- [ ] Node Script to check for existing achievements and add if necessary
- [ ] Manage Categories
- [ ] Manage Achievements
- [ ] Approve all functionality
- [ ] Checkin details and photo upload
- [ ] Implement back button with React Navigation code
    - https://github.com/react-navigation/react-navigation/blob/5e075e1c31d5e6192f2532a815b1737fa27ed65b/src/createNavigationContainer.js#L154
- [ ] React Navigation transitions
    - https://www.npmjs.com/package/react-navigation-transitions

### Advanced ToDos:	
- [ ] Integrate [Redux Persist](https://github.com/rt2zz/redux-persist)	
- [ ] Submit HTTP call with [MessagePack](https://msgpack.org/index.html)	
    - https://www.npmjs.com/package/body-parser-with-msgpack