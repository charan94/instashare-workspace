import { InstaFile } from './insta-file.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @OneToMany(type => InstaFile, instaFile => instaFile.user)
    files: InstaFile[];

    @BeforeInsert()
    async encryptPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(pass: string): Promise<boolean> {
        return await bcrypt.compare(pass, this.password);
    }

    toResponseObject(showToken: boolean = true) {
        const { firstName, lastName, email, files } = this;
        const responseObject = {
            email,
            firstName,
            lastName
        };
        return responseObject;
    }

}
