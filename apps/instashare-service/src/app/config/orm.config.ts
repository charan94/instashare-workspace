import { environment } from './../../environments/environment';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORM_CONFIG:TypeOrmModuleOptions = {
    "type": "mysql",
    "host": `${environment.MYSQL_HOST}`,
    "port": environment.MYSQL_PORT,
    "username": environment.MYSQL_USER_NAME,
    "password": environment.MYSQL_PASS,
    "database": environment.MYSQL_DB_NAME,
    "synchronize": true
}