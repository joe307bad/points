import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("Points", () => App);

if (window.document) {
    AppRegistry.runApplication("Points", {
        initialProps: {},
        rootTag: document.getElementById("react-root")
    });
}