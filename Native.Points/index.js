import { AppRegistry, Platform } from 'react-native';
import App from './app/App';
import { Sentry, SentryLog } from 'react-native-sentry';

Sentry.config('https://85099796d541450596ddf73f69808c95@sentry.io/1247865', {
    deactivateStacktraceMerging: true,
    logLevel: SentryLog.Verbose,
    // currently sentry is not reporting errors on android using the native module
    // disableNativeIntegration: Platform.OS === 'android',
}).install();

AppRegistry.registerComponent('points', () => App);
