import { UserService } from './../user/service/user.service';
import { InstaFile } from './../models/insta-file.entity';
import { UtilService } from './util/util.service';
import { UPLOAD_STATUS } from './../models/file-upload.status';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as JSZip from 'jszip';
import { InstaFileModel } from '../models/insta-file';

@Injectable()
export class SchedulerService {
    
    private readonly logger = new Logger(SchedulerService.name);

    PROCESS_RECORD_COUNT = 2;
    DELETE_RECORD_COUNT = 1;
    PROCESS_RECORDS = [];
    constructor(private utilService: UtilService, private userService: UserService) { }

    // run every 2 min
    @Cron(' */2 * * * *')
    async zipp() {
        this.logger.log('******************ZIPP SCHEDULER TRIGGERED**************');
        
        const records = await this.utilService.getUploadedRecords(this.PROCESS_RECORD_COUNT);
        if(!records || !records.length) {
            this.logger.log('******************EXITING ZIPP SCHEDULER - NO RECORDS FOUND**************');
        }
        records.forEach(async (record, i) => {
            const zippedFile = await this.zipFile(record.file, record.fileName);
            const user = await this.userService.findById(record.userId);
            const file = {
                file: zippedFile,
                fileName: record.fileName,
                fileStatus: record.fileStatus,
                fileSize: record.fileSize,
                mimeType: record.mimeType,
                uploadedDate: record.uploadedDate,
                user: user
            }
            await this.utilService.saveFileInRDS(file, record._id);
            if(i === records.length - 1) {
                this.logger.log('******************EXITING ZIPP SCHEDULER - DONE**************');
            }
        });
    }

    // run every 5 min
    @Cron(' */5 * * * *')
    async deleteFiles() {
        this.logger.log('******************DELETE SCHEDULER TRIGGERED**************');
        
        const records = await this.utilService.getFilesByStatus(UPLOAD_STATUS.MARKED_TO_DELETE, this.DELETE_RECORD_COUNT);
        if(!records || !records.length) {
            this.logger.log('******************EXITING DELETE SCHEDULER - NO RECORDS FOUND**************');
        }
        records.forEach(async (record, i) => {
            
            await this.utilService.deleteFileInRDS(record.id);
            await this.utilService.deleteFile(record.id);
            if(i === records.length - 1) {
                this.logger.log('******************EXITING DELETE SCHEDULER - DONE**************');
            }
        });
    }

    async zipFile(file, name) {
        let zip = new JSZip();
        zip.file(name, file, { base64: true });
        return await zip.generateAsync({type: 'base64'})
    }

}