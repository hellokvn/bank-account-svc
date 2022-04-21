import { FindAccountRequest } from '../../proto/bank-account-query.pb';

export class FindAccountDto implements FindAccountRequest {
  public id: string;
}
