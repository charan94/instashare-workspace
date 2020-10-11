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
    fileSize: number;

    @Column()
    uploadedDate: number;

    @Column()
    mimeType: string;

    @Column({type: 'blob'})
    file: any;

    @ManyToOne('User', 'files')
    user: User;
}