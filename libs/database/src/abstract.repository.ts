import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository{
  protected abstract readonly logger: Logger;
  constructor() {}
  //omit id cuz it's auto-generated
  async create() {

  }

  async findOne(filterQuery) {

  }

  async find(filterQuery) {

  }

  async findOneAndUpdate(
    filterQuery ,
    update ,
  ) {
    const doc = {};
    if (!doc) {
      this.logger.warn('Document not Found with Fitler Query: ', filterQuery);
      throw new NotFoundException('Document Not Found.');
    }
    return doc
  }
}
