"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JwtPayload {
    constructor() {
        this.username = '';
        this.id = '';
        this.roles = [];
        this.approved = false;
    }
}
exports.JwtPayload = JwtPayload;
