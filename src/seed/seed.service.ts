import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import { Transfer } from 'src/transfers/entities/transfer.entity';


@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Transfer)
        private readonly transferRepository: Repository<Transfer>,
    ) { }


    async runSeed() {

        await this.deleteTables();
        await this.insertUsers();

        return 'SEED EXECUTED';
    }

    private async deleteTables() {

        await this.transferRepository.createQueryBuilder()
            .delete()
            .where("id IS NOT NULL")
            .execute();

        await this.userRepository.createQueryBuilder()
            .delete()
            .where("id IS NOT NULL")
            .execute();

    }

    private async insertUsers() {

        const seedUsers = initialData.users;
        const users = seedUsers
            .map(user => this.userRepository.create(user));

        await this.userRepository.save(users);

        return true;
    }

}
