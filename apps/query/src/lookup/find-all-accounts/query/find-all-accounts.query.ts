import { FindAllAccountsDto } from '../controller/find-all-accounts.dto';

export class FindAllAccountsQuery {
  public page: number;

  constructor(query: FindAllAccountsDto) {
    this.page = query.page;
  }
}
