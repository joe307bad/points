export class ApiError {
    message: string;
    name: string;
    errors: { apiError: { message: string } }[];

    constructor(message: string) {
        this.message = message;
        this.name = 'API Error';
        this.errors = [{ apiError: { message } }];
    }

}
