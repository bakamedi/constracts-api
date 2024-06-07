import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const userEmail = req['user'].email; // Accede al usuario desde el objeto req
            const uploadPath = `uploads/${userEmail}/properties`;
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extname = path.extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${extname}`;
            cb(null, filename);
        },
    });

    private upload = multer({ storage: this.storage }).array('files');

    public async uploadFile(req, res): Promise<string> {
        return new Promise((resolve, reject) => {
            this.upload(req, res, (err) => {
                if (err) {
                    reject(new HttpException('Error uploading file', HttpStatus.BAD_REQUEST));
                }
                resolve(req.file.path);
            });
        });
    }
}
