import { IsUUID } from 'class-validator';

export class FindAccountDto {
  @IsUUID()
  public id: string;
}
