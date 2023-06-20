import { Length } from 'class-validator';

export class CreateDogDto {
  @Length(1, 64)
  name: string;

  @Length(1, 64)
  breed: string;
}
