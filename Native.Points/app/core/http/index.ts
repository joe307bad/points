import axios, { AxiosPromise } from 'axios';
import { persistentStorage } from '../../core/async-storage';

const API_URL = 'https://p.jbad.io/';

export class Http {

    private static _instance: Http;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private getConfig() {
        const token = persistentStorage.get('jwt');
        let config = {};
        debugger;
        if (token) {
            config = {
                headers: { 'Authorization': "Bearer " + token }
            };
        }
        return config;
    }

    public post<T>(url: string, payload: any): Promise<T> {
        return axios
            .post(API_URL + url, payload, this.getConfig())
            .then(result => result.data);
    }

}

export const http = Http.Instance;