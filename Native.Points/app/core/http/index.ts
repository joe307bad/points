import axios from 'axios';
import { persistentStorage } from '../../core/async-storage';

const API_URL = 'https://p.jbad.io/';

export class Http {

    private static instance: Http;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public async post<T>(url: string, payload: any): Promise<T> {
        return axios
            .post(API_URL + url, payload, await this.getConfig())
            .then((result: any) => result.data);
    }

    public async get<T>(url: string, payload?: any): Promise<T> {

        return axios
            .get(API_URL + url, {
                params: payload,
                ...await this.getConfig()
            })
            .then((result: any) => result.data);
    }

    public async put<T>(url: string, payload?: any): Promise<T> {
        debugger;
        return axios
            .put(API_URL + url, payload, await this.getConfig())
            .then((result: any) => result.data);
    }

    private async getConfig() {
        const token = await persistentStorage.get('jwt');
        let config = {};
        if (token) {
            config = {
                headers: { Authorization: 'Bearer ' + token }
            };
        }
        return config;
    }

}

export const http = Http.Instance;
