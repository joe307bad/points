"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDto {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.BaseDto = BaseDto;
