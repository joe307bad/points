import { diskStorage } from 'multer';
import { extname } from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env'});

interface IEnvironment {
    DB_URL: string;
    UPLOAD_DIR: string;
    PUBLIC_DIR: string;
    SECRET: string;
    API_INTENT_HEADER: string;
    OWNS_HEADER: string;
    GLOBAL_YEAR_FILTER: string;
}
declare let process: { env: IEnvironment };

export const dbUrl = process.env.DB_URL;
export const uploadDir = process.env.UPLOAD_DIR;
export const publicDir =  __dirname + process.env.PUBLIC_DIR;
export const secret = process.env.SECRET;
export const ApiIntentHeader = process.env.API_INTENT_HEADER;
export const OwnsHeader = process.env.OWNS_HEADER;
export const GlobalYearFilter = process.env.GLOBAL_YEAR_FILTER;

// TODO pre save file that runs mongoose.validate
export const UploadFileSettings = {
    storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            const fileName = `${randomName}${extname(file.originalname)}`;
            cb(null, fileName);
        }
    })
};
