import { SettingsDto } from '../dtos';

export interface ISettingsService {
    get(request: any): Promise<SettingsDto>;
}
