import { JwtStrategy } from './service/jwt.strategy';
import { LocalStrategy } from './service/local.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth/auth.controller';
import { UtilController } from './controllers/util/util.controller';
import { AuthService } from './service/auth/auth.service';
import { UtilService } from './service/util/util.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { getMetadataArgsStorage } from 'typeorm';
import { ORM_CONFIG } from './config/orm.config';
import { PassportModule } from '@nestjs/passport';
import { environment } from '../environments/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ORM_CONFIG,
      entities: getMetadataArgsStorage().tables.map(r => r.target)
    }),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: environment.JWT_EXPIRY },
    })
  ],
  controllers: [AuthController, UtilController],
  providers: [
    AuthService,
    UtilService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AppModule { }
