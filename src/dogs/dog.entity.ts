import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { validateOrReject, Length } from 'class-validator';
import { ValidatedEntity } from 'src/validated.entity';

@Entity()
export class Dog extends ValidatedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 64)
  name: string;

  @Column()
  @Length(1, 64)
  breed: string;

  @BeforeInsert()
  @BeforeUpdate()
  validate(): Promise<void> {
    return validateOrReject(this);
  }
}
