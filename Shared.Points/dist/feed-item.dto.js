"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeedItemDto {
    constructor() {
        this.achievementName = '';
        this.userName = '';
        this.checkinDate = new Date();
        this.achievementId = '';
        this.userId = '';
        this.points = 0;
        this.category = '';
        this.achievementDescription = '';
    }
}
exports.FeedItemDto = FeedItemDto;
