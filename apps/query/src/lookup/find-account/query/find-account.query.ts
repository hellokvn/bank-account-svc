import { FindAccountDto } from '../controller/find-account.dto';

export class FindAccountQuery {
  public id: string;

  constructor(query: FindAccountDto) {
    this.id = query.id;
  }
}
