import { AbstractRepository } from '@app/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

}