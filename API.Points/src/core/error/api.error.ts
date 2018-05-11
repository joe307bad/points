export class ApiError {

    private message: string;
    private name: string;
    private errors: { apiError: { message: string } }[];

    constructor(message: string) {
        this.message = message;
        this.name = 'API Error';
        this.errors = [{ apiError: { message } }];
    }

}