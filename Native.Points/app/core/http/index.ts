import axios, { AxiosRequestConfig } from 'axios';
import { ApiError } from '@points/shared';

import Utils from '../utils';
import { persistentStorage } from '../async-storage';
import Error from '../../shared/error-modal';
import { API_URL } from '../../App';

export class Http {

    private static instance: Http;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public async post<T>(url: string, payload: any, multipart: boolean = false): Promise<T> {
        const check = (data: any) => this.check(data, url, payload);

        return axios
            .post(API_URL + url, payload, await this.getConfig(multipart))
            .then((result: any) => check(result.data))
            .catch((err) => check(err));
    }

    public async get<T>(url: string, payload?: any): Promise<T> {
        const check = (data: any) => this.check(data, url, payload);
        return axios
            .get(API_URL + url, {
                params: payload,
                ...await this.getConfig()
            })
            .then((result: any) => check(result.data))
            .catch((err) => check(err));
    }

    public async put<T>(url: string, payload?: any): Promise<T> {
        const check = (data: any) => this.check(data, url, payload);
        return axios
            .put(API_URL + url, payload, await this.getConfig())
            .then((result: any) => check(result.data));
    }

    private check(data: any, url: string, payload: any) {
        let error = false;
        const parsedData = JSON.stringify(payload);
        let errorMessage = '';

        if (Utils.isEmptyObject(data)) {
            error = true;
            errorMessage = `Error: API returned a empty object
            \nEndpoint: ${url}
            \nPayload: ${parsedData}`;

        } else if (data.errors && data.errors.length) {
            error = true;
            errorMessage = `Error: API Error
            \nEndpoint: ${url}
            \nPayload: ${parsedData}`;

            data.errors.forEach((apiError: { apiError: ApiError }) => {
                errorMessage = errorMessage + `
                \nApiError: ${apiError.apiError.message}`;
            });

        } else if (data.response && data.response.data) {
            error = true;
            const statusCode = data.response.data.statusCode;
            errorMessage = `Error: ${statusCode}
            \nEndpoint: ${url}
            \nPayload: ${parsedData}
            \n${data.response.data.error}`;

            if (statusCode === 401) {
                Error.unauthorized = true;
            }

        } else if (data.message) {
            error = true;
            errorMessage = `Error: ${data.message}
            \nEndpoint: ${url}
            \nPayload: ${parsedData}`;

        } else if (!data) {
            error = true;
            errorMessage = `Error: API returned falsey value (probably empty string)
            \nEndpoint: ${url}
            \nPayload: ${parsedData}`;
        }

        if (error) {
            Error.openModal(errorMessage);
            return { errors: [true] };
        } else {
            Error.unauthorized = false;
            return data;
        }
    }

    private async getConfig(multipart: boolean = false) {
        const token = await persistentStorage.get('jwt');
        let config: AxiosRequestConfig = {
            timeout: 60000
        };

        if (token) {
            config = {
                ...config,
                ...{
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Cache-Control' : 'no-cache'
                    }
                }
            };
        }

        if (multipart) {
            config = {
                ...config,
                ...{
                    headers: {
                        ...config.headers,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            };
        }
        return config;
    }

}

export const http = Http.Instance;
