import { UtilController } from './controllers/util/util.controller';
import { UtilModule } from './util/util.module';
import { JwtStrategy } from './service/jwt.strategy';
import { LocalStrategy } from './service/local.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { getMetadataArgsStorage } from 'typeorm';
import { ORM_CONFIG, MONGO_URL } from './config/orm.config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ORM_CONFIG,
      entities: ['./models/index'],
      autoLoadEntities: true
    }),
    MongooseModule.forRoot(MONGO_URL),
    UserModule,
    UtilModule,
    PassportModule,
    JwtModule.register({
      secret: 'instashare12#$%',
      signOptions: { expiresIn: 3600 },
    })
  ],
  controllers: [AuthController, UtilController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AppModule { }
