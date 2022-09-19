import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserDto } from './dto';
import { User } from './models/user.entity';

@Injectable()
export class UsersRepository /*extends AbstractRepository*/ {
  protected readonly logger: Logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    //super(userModel);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(userId:number,updateQuery : QueryDeepPartialEntity<User>){
    return await this.usersRepository.update(userId,updateQuery)
  }
}
