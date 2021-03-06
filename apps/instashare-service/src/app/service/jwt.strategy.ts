import { AuthService } from './auth/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environment.JWT_SECRET,
        });
    }

    async validate(payload: any, done: Function) {
        const user = await this.authService.validateUserToken(payload);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
