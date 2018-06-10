import { AchievementDto } from "../dtos";

export interface IAchievementService {
    create(achievement: AchievementDto, photo: any): Promise<AchievementDto>;
    getAll(): Promise<AchievementDto[]>;
    get(achievement: { achievementId: string }): Promise<AchievementDto>;
    update(achievement: AchievementDto): Promise<AchievementDto>;
    search(search: { term: string }): Promise<AchievementDto[]>;
}