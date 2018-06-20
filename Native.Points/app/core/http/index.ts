import axios, { AxiosPromise } from 'axios';
import { persistentStorage } from '../../core/async-storage';

const API_URL = 'https://p.jbad.io/';

export class Http {

    private static _instance: Http;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private async getConfig() {
        const token = await persistentStorage.get('jwt');
        let config = {};

        if (token) {
            config = {
                headers: { 'Authorization': 'Bearer ' + token }
            };
        }
        return config;
    }

    public async post<T>(url: string, payload: any): Promise<T> {
        return axios
            .post(API_URL + url, payload, await this.getConfig())
            .then(result => result.data);
    }

    public async get<T>(url: string, payload?: any): Promise<T> {
        
        return axios
            .get(API_URL + url, {
                params: payload, 
                ...await this.getConfig()
            })
            .then(result => result.data);
    }

}

export const http = Http.Instance;