

import { AbstractEntity } from '@app/database';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Post extends AbstractEntity{

  @Column()
  public title: string;

  @Column()
  public content: string;
}
