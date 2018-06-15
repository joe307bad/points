import { ISettingsService, SettingsDto } from '@points/shared';
import { http } from '../../core/http';

const SETTINGS_API_URL = 'settings/';

export class SettingsService implements ISettingsService {

    private static _instance: SettingsService;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get(): Promise<SettingsDto> {
        return http.get(SETTINGS_API_URL);
    }

}

export const settingsService = SettingsService.Instance;