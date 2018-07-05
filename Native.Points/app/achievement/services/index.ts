import { IAchievementService, AchievementDto } from '@points/shared';

import { http } from '../../core/http';

const ACHIEVEMENT_API_URL = 'achievement/';

// TODO consider moving all services into shared since they are used across different domains
export class AchievementService implements IAchievementService {

    private static instance: AchievementService;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public create(achievement: AchievementDto, photo: any): Promise<AchievementDto> {
        throw new Error('Method not implemented.');
    }

    public getAll(): Promise<AchievementDto[]> {
        return http.get<AchievementDto[]>(ACHIEVEMENT_API_URL);
    }

    public get(achievement: { achievementId: string; }): Promise<AchievementDto> {
        throw new Error('Method not implemented.');
    }

    public update(achievement: AchievementDto): Promise<AchievementDto> {
        throw new Error('Method not implemented.');
    }

    public search(search: { term: string; }): Promise<AchievementDto[]> {
        return http.post(ACHIEVEMENT_API_URL + 'search/', search);
    }

}

export const achievementService = AchievementService.Instance;
