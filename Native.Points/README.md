## Native.Points
### React Native application for adding and checking into achievements

##### Technical Features:
* React Native for native iOS/Android application development
* Redux for state management
* Typescript for a high level of structure and strong typing
* [React Native Elements](https://bozzmob.github.io/react-native-elements/) UI toolkit
---
### ToDos:
- [ ] Intoduce login/register flow with storage of JWT
    - https://github.com/cornflourblue/react-redux-registration-login-example/tree/master/src
    - https://github.com/sotojuan/saga-login-flow
    - https://github.com/piotrwitek/react-redux-typescript-guide
    - https://github.com/Microsoft/TypeScript-React-Starter
- [ ] HTTP wrapper that uses JWT or prompts for login if JWT is not present
- [ ] Introduce [Saga](https://redux-saga.js.org/) for side effects (showing loading, prompting for login, etc.)
- [ ] Introduce navigation	
- [ ] Try to test on iPhone via [Expo](expo.io)	

### Advanced ToDos:	
- [ ] Integrate [Redux Persist](https://github.com/rt2zz/redux-persist)	
- [ ] Submit HTTP call with [MessagePack](https://msgpack.org/index.html)	
    - https://www.npmjs.com/package/body-parser-with-msgpack