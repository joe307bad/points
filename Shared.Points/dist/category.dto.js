"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_dto_1 = require("./base.dto");
class CategoryDto extends base_dto_1.BaseDto {
    constructor() {
        super(...arguments);
        this.name = '';
    }
}
exports.CategoryDto = CategoryDto;
