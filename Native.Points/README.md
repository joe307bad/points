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
* [Formik](https://github.com/jaredpalmer/formik) and [Yup](https://github.com/jquense/yup) for easy form construction and validation
---

### Post Beta ToDos:
- [ ] Why does upload endpoint return empty object when no uploads are present
- [ ] Seed endpoint accessible by admins to check for existing achievements and add if necessary
    - Download photos and save to jbhs-scripts projects
    - Transcribe all achievements on bachlr to json file
    - Alter points playbook to copy up json file and photos and run endpoint
- [ ] If use is booted back to login screen, return them to previous screen once they log back in
- [ ] Flow to approve users instead of automatially granting access
- [ ] Manage Categories
- [ ] Manage Achievements
- [ ] Approve all functionality
- [ ] Checkin details and photo upload
- [ ] User profile page with personal feed and photo upload capabilities
- [ ] Favorite achievements and see them in profile page
- [ ] Look at todos
- [ ] Implement back button with React Navigation code
    - https://github.com/react-navigation/react-navigation/blob/5e075e1c31d5e6192f2532a815b1737fa27ed65b/src/createNavigationContainer.js#L154
- [ ] React Navigation transitions
    - https://www.npmjs.com/package/react-navigation-transitions

### Advanced ToDos:	
- [ ] since all reducers are called for every action, we can consolidate all the success/failure actions into a single Result/Response reducer instead of having a Success/Failure action for every domain action. This would make isProcessing much more simple
- [ ] Integrate [Redux Persist](https://github.com/rt2zz/redux-persist)	
- [ ] Submit HTTP call with [MessagePack](https://msgpack.org/index.html)	
    - https://www.npmjs.com/package/body-parser-with-msgpack