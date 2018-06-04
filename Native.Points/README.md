## Native.Points
### React Native application for adding and checking into achievements

##### Technical Features:
* [React Native](https://facebook.github.io/react-native/) for native iOS/Android application development
* [Redux](https://redux.js.org/) for state management
* [Redux Saga](https://redux-saga.js.org/) for side effect management
* [Typescript](https://www.typescriptlang.org/) for a high level of structure and strong typing
* [React Native Elements](https://bozzmob.github.io/react-native-elements/) UI toolkit
---
### ToDos:
- [ ] Introduce login/register flow with storage of JWT
    - https://github.com/cornflourblue/react-redux-registration-login-example/tree/master/src
    - https://github.com/sotojuan/saga-login-flow
    - https://github.com/piotrwitek/react-redux-typescript-guide
    - https://github.com/Microsoft/TypeScript-React-Starter
- [ ] Introduce [Reselect](https://github.com/reduxjs/reselect)
- [ ] HTTP wrapper that uses JWT or prompts for login if JWT is not present
- [ ] Introduce navigation (add endpoint to get navigation)	
- [ ] Route gaurds
    - https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1
- [ ] Try to test on iPhone via [Expo](expo.io)	

### Advanced ToDos:	
- [ ] Integrate [Redux Persist](https://github.com/rt2zz/redux-persist)	
- [ ] Submit HTTP call with [MessagePack](https://msgpack.org/index.html)	
    - https://www.npmjs.com/package/body-parser-with-msgpack