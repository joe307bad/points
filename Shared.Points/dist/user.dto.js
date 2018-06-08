"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class UserDto {
    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.userName = '';
        this.password = '';
        this.roles = [];
        this.photo = '';
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(200, { message: '200 character max' })
], UserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(200, { message: '200 character max' })
], UserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(20, { message: '200 character max' })
], UserDto.prototype, "userName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(200, { message: '200 character max' })
], UserDto.prototype, "password", void 0);
exports.UserDto = UserDto;
