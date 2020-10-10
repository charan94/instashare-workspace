import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORM_CONFIG:TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "instashareuser",
    "password": "Passw0rd12",
    "database": "instashare",
    "synchronize": true
}