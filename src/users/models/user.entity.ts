
import { AbstractEntity } from '@app/database';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column({default:''})
  public name?: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({default:''})
  @Exclude()
  public currentHashedRefreshToken?: string;

}

