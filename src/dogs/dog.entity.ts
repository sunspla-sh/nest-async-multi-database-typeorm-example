import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length } from 'class-validator';
import { ValidatedEntity } from '../validated.entity';

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
}
