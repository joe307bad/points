"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const achievement_dto_1 = require("./achievement.dto");
class AchievementCheckinDto extends achievement_dto_1.AchievementDto {
    constructor() {
        super(...arguments);
        this.achievementId = '';
        this.checkinId = '';
        this.checkinDate = '';
    }
}
exports.AchievementCheckinDto = AchievementCheckinDto;
