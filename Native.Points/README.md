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
* [Sentry](https://github.com/getsentry/react-native-sentry) for crash reporting

##### Other Credits:
* [react-community/react-native-image-picker](https://github.com/react-community/react-native-image-picker)
* [FidMe/react-native-photo-gallery](https://github.com/FidMe/react-native-photo-gallery)
* [maxs15/react-native-modalbox](https://github.com/maxs15/react-native-modalbox)
* [skv-headless/react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)
* [thegamenicorus/react-native-timeline-listview](https://github.com/thegamenicorus/react-native-timeline-listview0)

### How to start in Android emulator on Windows
1. Install dependencies
```bash
npm install
```
2. Clean Android project
```bash
cd android
./gradlew clean
```
3. Link react-native libraries
```bash
cd ..
react-native link
```
_Note: This may walk you through linking your project with Sentry_

4. Boot up emulator (I use Genymotion)

5. Set environment file (for powershell)
```bash
$env:ENVFILE=".env"
```

6. Run React Native project
```bash
react-native run-android
```

### Admin check in for other users feature todos:
- [ ] Add GetAllUsers API endpoint and wire up to picker
- [ ] Allow all admin checkins to be automatically approved
- [X] ~~Make sure checkins for other users do not add to current user checkin total~~

### User Checkins feature todos:
- [ ] Access loaded user checkins if checkins had already been loaded
- [ ] Add refresh button to modal to manually load checkins
 
### Post Beta ToDos:
- [ ] Return search results as you type
- [ ] Admin ability to remove pending approvals (delete checkins)
- [ ] User profile page with personal feed, photo upload capabilities, and leaderboard avatars
- [ ] Implement back button with React Navigation code
    - https://github.com/react-navigation/react-navigation/blob/5e075e1c31d5e6192f2532a815b1737fa27ed65b/src/createNavigationContainer.js#L154
- [ ] Why does upload endpoint return empty object when no uploads are present
- [ ] If use is booted back to login screen, return them to previous screen once they log back in
- [ ] Flow to approve users instead of automatially granting access
- [ ] Manage Categories
- [ ] Manage Achievements
- [ ] Approve all functionality
- [ ] Checkin details and photo upload
- [ ] Favorite achievements and see them in profile page
- [ ] Look at todos
- [ ] React Navigation transitions
    - https://www.npmjs.com/package/react-navigation-transitions

### Advanced ToDos:	
- [ ] since all reducers are called for every action, we can consolidate all the success/failure actions into a single Result/Response reducer instead of having a Success/Failure action for every domain action. This would make isProcessing much more simple
- [ ] Integrate [Redux Persist](https://github.com/rt2zz/redux-persist)	
- [ ] Submit HTTP call with [MessagePack](https://msgpack.org/index.html)	
    - https://www.npmjs.com/package/body-parser-with-msgpack

### Consideratons for next React project:
* Use immutable.js utilities (like fromJS) inside the reducers
* use action creators
* avoid using componentWillUpdate
* be more vigilant with using stateless/pure components
