import { User } from './../../models/user.entity';
import { Injectable } from '@nestjs/common';
import { UPLOAD_STATUS } from '../../models/file-upload.status';
import { InjectModel } from '@nestjs/mongoose';
import { MInstaFile, MInstaFileDocument } from '../../models/insta-file.schema';
import { Model } from 'mongoose';

@Injectable()
export class UtilService {
    constructor(@InjectModel(MInstaFile.name) private instFileModel: Model<MInstaFileDocument>) { }

    uploadFiles(files: Array<any>, user: User, uploadedDate) {
        let instaFiles = [];
        return new Promise((resolve, reject) => {
            files.forEach(async (file, i) => {
                let instaFile = {
                    id: null,
                    tempId: this.generateRandomId(),
                    fileName: file.originalname,
                    fileStatus: UPLOAD_STATUS.UPLOADED,
                    fileSize: file.size,
                    uploadedDate: uploadedDate,
                    file: file.buffer.toString('hex'),
                    mimeType: file.mimetype,
                    userId: user.id
                }
                instaFiles.push(instaFile);
                if (i === files.length - 1) {
                    try {
                        const result = await this.instFileModel.insertMany(instaFiles);
                        resolve({data: result.map(r => {r.file = ''; return r})});
                        
                    } catch (err) {
                        reject(err);
                    }
                }
            })
        });
    }

    async getFiles(user: User) {
        const files = await this.instFileModel.find({ userId: user.id }).select({ file: 0 })
        return { data: files };
    }

    generateRandomId() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}
