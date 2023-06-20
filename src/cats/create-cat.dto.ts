import { Length, IsInt } from 'class-validator';

export class CreateCatDto {
  @Length(1, 64)
  name: string;

  @IsInt()
  age: number;
}
