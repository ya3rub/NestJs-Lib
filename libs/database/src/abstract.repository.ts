import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractEntity } from './absrtact.entity';

export abstract class AbstractRepository<T extends AbstractEntity> {
  //protected abstract readonly logger: Logger;

  constructor(protected readonly entityRepository: Repository<T>) {}

  async create(dto) {
    const newEntity = await this.entityRepository.create(dto);
    await this.entityRepository.save(newEntity);
    return newEntity;
  }

  async update(userId:number,updateQuery : QueryDeepPartialEntity<T>){
    return await this.entityRepository.update(userId,updateQuery)
  }

}