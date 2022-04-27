import { FindAccountDto } from '../controller/find-account.dto';

export class FindAccountQuery {
  public id: string;

  constructor(payload: FindAccountDto) {
    this.id = payload.id;
  }
}
