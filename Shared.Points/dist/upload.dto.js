"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class UploadDto extends base_dto_1.BaseDto {
    constructor() {
        super(...arguments);
        this.id = '';
        this.userId = '';
        this.photo = '';
        this.title = '';
        this.description = '';
    }
}
__decorate([
    class_validator_1.IsString()
], UploadDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsString()
], UploadDto.prototype, "photo", void 0);
__decorate([
    class_validator_1.IsString()
], UploadDto.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString()
], UploadDto.prototype, "description", void 0);
exports.UploadDto = UploadDto;
