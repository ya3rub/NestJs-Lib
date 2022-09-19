

import { AbstractEntity } from '@app/database';
import { Transform } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Post extends AbstractEntity{

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Transform(({value}) => {
    if (value !== null) {
      return value;
    }
  })
  @Column({ nullable: true })
  public category?: string;
}
