import { AbstractEntity } from '@app/database';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { Permission, Role } from '../../auth/enums';
@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column({ default: '' })
  public name?: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: '' })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({
    array: true,
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  public roles: Role[];

  @Column({
    array: true,
    type: 'enum',
    enum: Permission,
    default: [],
  })
  public permissions: Permission[];

  @Column({ default: false })
  public isEmailConfirmed: boolean;
}
