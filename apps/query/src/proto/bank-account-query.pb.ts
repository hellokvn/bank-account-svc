/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'bank_account_query';

export interface FindAccountRequest {
  id: string;
}

export interface FindAccountResponse {
  status: number;
  error: string[];
  id: string;
}

export const BANK_ACCOUNT_QUERY_PACKAGE_NAME = 'bank_account_query';

export interface BankAccountQueryServiceClient {
  findAccount(request: FindAccountRequest): Observable<FindAccountResponse>;
}

export interface BankAccountQueryServiceController {
  findAccount(request: FindAccountRequest): Promise<FindAccountResponse> | Observable<FindAccountResponse> | FindAccountResponse;
}

export function BankAccountQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findAccount'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('BankAccountQueryService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('BankAccountQueryService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BANK_ACCOUNT_QUERY_SERVICE_NAME = 'BankAccountQueryService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
