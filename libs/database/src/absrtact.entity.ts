
//ensure having id
//@Schema()

import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbstractEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

}
