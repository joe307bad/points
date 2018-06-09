"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_dto_1 = require("./base.dto");
class PendingApprovalDto extends base_dto_1.BaseDto {
    constructor() {
        super(...arguments);
        this.checkinId = '';
        this.userName = '';
        this.achievementName = '';
        this.points = '';
        this.checkinDate = new Date();
    }
}
exports.PendingApprovalDto = PendingApprovalDto;
