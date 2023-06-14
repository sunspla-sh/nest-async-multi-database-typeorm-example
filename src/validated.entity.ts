import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject } from 'class-validator';

export abstract class ValidatedEntity {
  @BeforeInsert()
  @BeforeUpdate()
  validate(): Promise<void> {
    return validateOrReject(this);
  }
}
