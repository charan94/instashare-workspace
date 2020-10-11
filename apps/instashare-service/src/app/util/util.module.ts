import { UtilService } from './../service/util/util.service';
import { InstaFile } from './../models/insta-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MInstaFile, MInstaFileSchema } from '../models/insta-file.schema';


@Module({
  imports: [TypeOrmModule.forFeature([InstaFile]), MongooseModule.forFeature([{name: MInstaFile.name, schema: MInstaFileSchema}])],
  providers: [UtilService],
  controllers: [],
  exports: [UtilService]
})
export class UtilModule {}
