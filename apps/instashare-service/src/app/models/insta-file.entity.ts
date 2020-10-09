import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class InstaFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column()
    fileStatus: string;

    @Column()
    fileSize: string;

    @Column()
    uploadedDate: number;

    @Column({type: 'blob'})
    file: any;

    @Column({type: 'blob'})
    modifiedFile: any;

    @ManyToOne(type => User, user => user.files)
    user: User;
}