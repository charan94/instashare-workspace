import { User } from './../../models/user.entity';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserModel } from '../../models/user';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    public async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.userRepo.findOne({ email: email });
    }

    public async findById(id: number): Promise<User | null> {
        return await this.userRepo.findOneOrFail(id);
    }

    public async create(user: UserModel): Promise<User> {
        return await this.userRepo.save(user);
    }

    public async update(
        id: number,
        newValue: UserModel,
    ): Promise<User | null> {
        const user = await this.userRepo.findOneOrFail(id);
        if (!user.id) {
            Logger.log('No User Found');
        }
        await this.userRepo.update(id, newValue);
        return await this.userRepo.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepo.delete(id);
    }

    public async register(userDto: UserModel): Promise<User> {
        const { email } = userDto;
        let user = await this.userRepo.findOne({ where: { email } });
        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        user = await this.userRepo.create(userDto);
        return await this.userRepo.save(user);
    }

}
