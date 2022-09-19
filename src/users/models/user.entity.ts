
import { AbstractEntity } from '@app/database';
import { Column, Entity } from 'typeorm';
@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column({default:''})
  public name?: string;

  @Column()
  public password: string;
}

