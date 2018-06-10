import { diskStorage } from 'multer';
import { extname } from 'path';

// TODO replace these values when bundling for deployment
export const dbUrl = 'mongodb://localhost:27017/points'; // mongodb://mongodb:27017/points;
export const uploadDir = './public/uploads'; // ./dist/public/uploads
export const secret = '8QnwdhUqb7TgebAwTwpvmBKdFgTE3bFNcDUL3DgTuFDG0';
export const ApiIntentHeader = 'X-Api-Intent';
export const OwnsHeader = 'X-Owns-Resource';

// TODO pre save file that runs mongoose.validate
export const UploadFileSettings = {
    storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
};
