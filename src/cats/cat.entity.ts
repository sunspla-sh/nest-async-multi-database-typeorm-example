import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, Length } from 'class-validator';
import { ValidatedEntity } from '../validated.entity';

@Entity()
export class Cat extends ValidatedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 64)
  name: string;

  @Column()
  @IsInt()
  age: number;
}
