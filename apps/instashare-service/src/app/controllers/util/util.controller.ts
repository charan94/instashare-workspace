import { UserService } from './../../user/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UtilService } from './../../service/util/util.service';
import { Controller, Post, UploadedFiles, UseInterceptors, Logger, UseGuards, Body, Get, Query, HttpException, Param, Delete, Put, UploadedFile } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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
        const result: any = await this.utilService.uploadFiles(files, user, uploadedDate);
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

    @UseGuards(AuthGuard('jwt'))
    @Get('/file/:id')
    async getFile(@Param('id') id: number) {
        const result = await this.utilService.getFileById(id);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/file/delete/:id')
    async deleteFile(@Param('id') id: number) {
        await this.utilService.markForDelete(id);
        return { status: true, id: id };
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/file')
    @UseInterceptors(
        FileInterceptor('insta-file')
    )
    async updateFile(@UploadedFile() file, @Body() body) {
        const fileId = parseInt(body.fileId);
        console.log('file ', file);
        const fileName = body.fileName;
        const uploadedDate = body.uploadedDate;
        const result = await this.utilService.updateFile(fileId, fileName, uploadedDate, file);
        return result;
    }
}
