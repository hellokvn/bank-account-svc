import { IsInt, IsOptional, Min } from 'class-validator';

export class FindAllAccountsDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  public page: number = 1;
}
