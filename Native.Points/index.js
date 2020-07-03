import { AppRegistry, Platform } from 'react-native';
import App from './app/App';
import * as Sentry from "@sentry/react-native";

Sentry.init({
    dsn: 'https://85099796d541450596ddf73f69808c95@sentry.io/1247865'
});
console.disableYellowBox = true;
AppRegistry.registerComponent('Points', () => App);
