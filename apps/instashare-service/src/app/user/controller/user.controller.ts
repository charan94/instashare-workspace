import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    
    @Get('/user/files')
    async getFiles() {
        
    }
}
