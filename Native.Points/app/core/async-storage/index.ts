import { AsyncStorage } from 'react-native';

export type StorageKey = 'jwt';

export class PersistentStorage {

    private static instance: PersistentStorage;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public get(key: StorageKey): Promise<string> {
        return AsyncStorage.getItem(key);
    }

    public set(key: StorageKey, value: string): Promise<void> {
        return AsyncStorage.setItem(key, value);
    }

    public delete(key: StorageKey): Promise<void> {
        return AsyncStorage.removeItem(key);
    }

}

export const persistentStorage = PersistentStorage.Instance;
