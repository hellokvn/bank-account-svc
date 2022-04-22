/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'bank_account_command';

export interface OpenAccountRequest {
  holder: string;
  type: string;
  email: string;
  openingBalance: number;
}

export interface OpenAccountResponse {
  status: number;
  error: string[];
  data: string;
}

export interface CloseAccountRequest {
  id: string;
}

export interface CloseAccountResponse {
  status: number;
  error: string[];
}

export const BANK_ACCOUNT_COMMAND_PACKAGE_NAME = 'bank_account_command';

export interface BankAccountCommandServiceClient {
  openAccount(request: OpenAccountRequest): Observable<OpenAccountResponse>;

  closeAccount(request: CloseAccountRequest): Observable<CloseAccountResponse>;
}

export interface BankAccountCommandServiceController {
  openAccount(request: OpenAccountRequest): Promise<OpenAccountResponse> | Observable<OpenAccountResponse> | OpenAccountResponse;

  closeAccount(
    request: CloseAccountRequest,
  ): Promise<CloseAccountResponse> | Observable<CloseAccountResponse> | CloseAccountResponse;
}

export function BankAccountCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['openAccount', 'closeAccount'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('BankAccountCommandService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('BankAccountCommandService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BANK_ACCOUNT_COMMAND_SERVICE_NAME = 'BankAccountCommandService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
