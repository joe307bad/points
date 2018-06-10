import { SettingsDto } from "../dtos";

export interface ISettingsService {
    get(): Promise<SettingsDto>;
}