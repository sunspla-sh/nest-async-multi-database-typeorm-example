import { IsInt, validateSync, Length } from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';

export class EnvironmentVariables {
  @Length(1)
  MYSQL_DB_TYPE: string;

  @Length(1)
  MYSQL_DB_NAME: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  MYSQL_DB_PORT: number;

  @Length(1)
  MYSQL_DB_HOST: string;

  @Length(1)
  MYSQL_DB_USERNAME: string;

  @Length(1)
  MYSQL_DB_PASSWORD: string;

  @Length(1)
  SQLITE_DB_TYPE: string;

  @Length(1)
  SQLITE_DB_NAME: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  APP_PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);

  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
