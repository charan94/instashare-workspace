import { UPLOAD_STATUS } from './../../models/file-upload.status';
import { InstaFile } from './../../models/insta-file.entity';
import { User } from './../../models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MInstaFile, MInstaFileDocument } from '../../models/insta-file.schema';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UtilService {
    constructor(@InjectModel(MInstaFile.name) private instFileModel: Model<MInstaFileDocument>, @InjectRepository(InstaFile) private instaFileRepo: Repository<InstaFile>) { }

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
                    file: file.buffer.toString('base64'),
                    mimeType: file.mimetype,
                    userId: user.id
                }
                instaFiles.push(instaFile);
                if (i === files.length - 1) {
                    try {
                        const result = await this.instFileModel.insertMany(instaFiles);
                        resolve({ data: result.map(r => { r.file = ''; return r }) });

                    } catch (err) {
                        reject(err);
                    }
                }
            })
        });
    }

    async getFiles(user: User) {
        const files = await this.instFileModel.find({ userId: user.id, fileStatus: { $ne: UPLOAD_STATUS.MARKED_TO_DELETE } }).select({ file: 0 })
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

    async getUploadedRecords(limit) {
        return await this.instFileModel.find({ fileStatus: UPLOAD_STATUS.UPLOADED }).limit(limit);
    }

    async saveFileInRDS(instaFile, id) {
        const updatedFile = { ...instaFile };
        updatedFile.fileStatus = UPLOAD_STATUS.ZIPPED;
        const result = await this.instaFileRepo.save(updatedFile);
        await this.instFileModel.findOne({ _id: id }).update({ id: result.id, fileStatus: UPLOAD_STATUS.ZIPPED, file: instaFile.file });
    }

    async getFileById(fileId) {
        const result = await this.instFileModel.findOne({id: fileId}).select({file: 1, _id: 0, fileName: 1});
        return {data: result}
    }

    async markForDelete(fileId) {
        const deletedFile = await this.instFileModel.findOne({id: fileId});
        deletedFile.fileStatus = UPLOAD_STATUS.MARKED_TO_DELETE;
        await this.instFileModel.findByIdAndUpdate(deletedFile._id, deletedFile);
    }

    async editFile(fileId) {

    }

    async getFilesByStatus(fileStatus, count) {
        const files = await this.instFileModel.find({fileStatus: fileStatus}).limit(count);
        return files;
    }

    async deleteFileInRDS(fileId) {
        await this.instaFileRepo.delete({id: fileId});
        return true;
    }

    async deleteFile(fileId) {
        await this.instFileModel.deleteOne({id: fileId});
        return true;
    }

}
