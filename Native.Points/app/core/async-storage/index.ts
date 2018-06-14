import { AsyncStorage } from "react-native";

export type StorageKey = 'jwt';

export default class PersistentStorage {

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