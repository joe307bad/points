import { AsyncStorage } from 'react-native';

export type StorageKey = 'jwt';

export class PersistentStorage {
    
    private static _instance: PersistentStorage;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get(key: StorageKey): Promise<string> {
        return AsyncStorage.getItem(key);
    }

    set(key: StorageKey, value: string): Promise<void> {
        return AsyncStorage.setItem(key, value);
    }

    delete(key: StorageKey): Promise<void> {
        return AsyncStorage.removeItem(key);
    }

}

export const persistentStorage = PersistentStorage.Instance;