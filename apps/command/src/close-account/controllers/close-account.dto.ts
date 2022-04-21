import { IsUUID } from 'class-validator';

export class CloseAccountDto {
  @IsUUID()
  public id: string;
}
