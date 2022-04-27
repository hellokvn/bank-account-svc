/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'bank_funds_query';

export interface GetBalanceRequest {
  id: string;
}

export interface GetBalanceResponse {
  status: number;
  error: string[];
  data: number;
}

export const BANK_FUNDS_QUERY_PACKAGE_NAME = 'bank_funds_query';

export interface BankFundsQueryServiceClient {
  getBalance(request: GetBalanceRequest): Observable<GetBalanceResponse>;
}

export interface BankFundsQueryServiceController {
  getBalance(request: GetBalanceRequest): Promise<GetBalanceResponse> | Observable<GetBalanceResponse> | GetBalanceResponse;
}

export function BankFundsQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getBalance'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('BankFundsQueryService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('BankFundsQueryService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BANK_FUNDS_QUERY_SERVICE_NAME = 'BankFundsQueryService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
