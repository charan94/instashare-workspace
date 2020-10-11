import { UserService } from './../../user/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UtilService } from './../../service/util/util.service';
import { Controller, Post, UploadedFiles, UseInterceptors, Logger, UseGuards, Body, Get, Query, HttpException, Param } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('util')
export class UtilController {

    constructor(private userService: UserService, private utilService: UtilService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('/upload')
    @UseInterceptors(
        FilesInterceptor('insta-file')
    )
    async uploadFiles(@UploadedFiles() files, @Body() body) {
        const uploadedDate = body.uploadedDate;
        const email = body.email;
        const user = await this.userService.findByEmail(email);
        if (!files) {
            throw new HttpException({ error: 'Error in uploading files' }, 500);
        }
        if (!user) {
            throw new HttpException({ error: 'Cannot upload files to this user' }, 500);
        }
        const result:any = await this.utilService.uploadFiles(files, user, uploadedDate);
        return Promise.resolve({ status: true, data: result.data });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/files')
    async getFilesList(@Body() body) {
        const email = body.email;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpException({ error: 'Files for this user cannot be determined' }, 500);
        }
        const result = await this.utilService.getFiles(user);
        return result;
    }
}
