"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_dto_1 = require("./navigation.dto");
class SettingsDto {
    constructor() {
        this.navigation = new navigation_dto_1.NavigationDto();
    }
}
exports.SettingsDto = SettingsDto;
