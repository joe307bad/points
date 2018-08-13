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

##### Other Credits:
* [react-community/react-native-image-picker](https://github.com/react-community/react-native-image-picker)
* [FidMe/react-native-photo-gallery](https://github.com/FidMe/react-native-photo-gallery)
* [maxs15/react-native-modalbox](https://github.com/maxs15/react-native-modalbox)
* [skv-headless/react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)
* [thegamenicorus/react-native-timeline-listview](https://github.com/thegamenicorus/react-native-timeline-listview0)

---

### Bugs
- App crashes when zooming out on android upload picture
    - https://github.com/alwx/react-native-photo-view/issues/15
 
### Post Beta ToDos:
- [ ] Ability to see other people's achievements
- [ ] Return search results as you type
- [ ] Admin ability to checkin as users (mainly for negative achievements)
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
* be more vigalant with using stateless/pure components
