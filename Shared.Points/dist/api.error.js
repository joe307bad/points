"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(message) {
        this.message = message;
        this.name = 'API Error';
        this.errors = [{ apiError: { message } }];
    }
}
exports.ApiError = ApiError;
