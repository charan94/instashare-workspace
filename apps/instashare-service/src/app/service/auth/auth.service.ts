import { UserModel } from './../../models/user';
import { UserService } from './../../user/service/user.service';
import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { environment } from 'apps/instashare-service/src/environments/environment';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }
    
    private readonly logger = new Logger(AuthService.name);

    createToken(user: UserModel) {
        const expiresIn = 3600;
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                firstname: user.firstName,
                lastname: user.lastName,
            },
            environment.JWT_SECRET,
            { expiresIn },
        );
        return {
            expiresIn,
            accessToken,
        };
    }

    async validateUserToken(payload): Promise<UserModel> {
        return await this.userService.findById(payload.id);
    }

    async validateUser(email: string, password: string): Promise<UserModel> {
        const user = await this.userService.findByEmail(email);
        if (user && user.comparePassword(password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
