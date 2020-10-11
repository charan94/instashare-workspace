import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORM_CONFIG:TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "mysqldb.cluyrmmcw8ys.us-east-1.rds.amazonaws.com",
    "port": 3306,
    "username": "instashareuser",
    "password": "Passw0rd12",
    "database": "instashare",
    "synchronize": true,
    "multipleStatements": true
}

export const MONGO_URL = `mongodb+srv://instashareuser:Passw0rd12@cluster0.kifre.mongodb.net/insta-share?retryWrites=true&w=majority`