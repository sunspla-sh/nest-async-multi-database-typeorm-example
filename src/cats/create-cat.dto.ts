import { Length, IsInt } from 'class-validator';

export class CreateCatDto {
  @Length(1)
  name: string;

  @IsInt()
  age: number;
}
