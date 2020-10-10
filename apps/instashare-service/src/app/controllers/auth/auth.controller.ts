import { AuthService } from './../../service/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from './../../models/user';
import { UserService } from './../../user/service/user.service';
import { Controller, Post, Response, Body, HttpException, UseGuards, HttpStatus, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService, private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Res() res, @Body() body) {
        console.log('bdy ', body);
        if (!body.email) {
            throw new HttpException({ error: 'Email is Required' }, 500);
        }
        if (!body.password) {
            throw new HttpException({ error: 'Password is Required' }, 500);
        }
        const user = await this.authService.validateUser(body.email, body.password);
        if(user !== null) {
            const token = this.authService.createToken(user);
            return res.status(HttpStatus.OK).json({ email: user.email, firstName: user.firstName, lastName: user.lastName, token });
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Incorrect Email or Password' });
        }
    }

    
    @Post('/register')
    async registerUser(@Response() res, @Body() body: UserModel) {
        if (!body.email) {
            throw new HttpException({ error: 'Email is Required' }, 500);
        }
        if (!body.firstName) {
            throw new HttpException({ error: 'FirstName is Required' }, 500);
        }
        if (!body.lastName) {
            throw new HttpException({ error: 'LastName is Required' }, 500);
        }
        if (!body.password) {
            throw new HttpException({ error: 'Password is Required' }, 500);
        }
        const user = await this.userService.findByEmail(body.email);
        if (user && user.email) {
            throw new HttpException({ error: 'User already exists' }, 500);
        }
        const { email, firstName, lastName } = await this.userService.register(body);
        const token = this.authService.createToken(body);
        return res.status(HttpStatus.OK).json({ email, firstName, lastName, token });
    }
}
