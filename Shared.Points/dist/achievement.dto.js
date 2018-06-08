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
const category_dto_1 = require("./category.dto");
class AchievementDto extends base_dto_1.BaseDto {
    constructor() {
        super(...arguments);
        this.id = '';
        this.achievementId = '';
        this.name = '';
        this.description = '';
        this.points = 0;
        this.category = new category_dto_1.CategoryDto;
        this.photo = '';
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(200, { message: '200 character max' })
], AchievementDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(200, { message: '200 character max' })
], AchievementDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty()
], AchievementDto.prototype, "points", void 0);
exports.AchievementDto = AchievementDto;
