import { diskStorage } from 'multer';
import { extname } from 'path';

// TODO pre save file that runs mongoose.validate
export const UploadFileSettings = {
    storage: diskStorage({
        destination: './dist/public/uploads',
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
};
