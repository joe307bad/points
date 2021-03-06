export class DatabaseService {

    static async save(model: any): Promise<any> {
        const result = await model.save();
        if (result.errors) {
            return Promise.reject(result);
        } else {
            return Promise.resolve(result);
        }
    }

}
