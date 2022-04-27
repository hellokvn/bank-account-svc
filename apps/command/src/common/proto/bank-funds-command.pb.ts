/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'bank_funds_command';

export interface DepositFundsRequest {
  id: string;
  amount: number;
}

export interface DepositFundsResponse {
  status: number;
  error: string[];
}

export interface WithdrawFundsRequest {
  id: string;
  amount: number;
}

export interface WithdrawFundsResponse {
  status: number;
  error: string[];
}

export interface TransferFundsRequest {
  fromId: string;
  toId: string;
  amount: number;
}

export interface TransferFundsResponse {
  status: number;
  error: string[];
}

export const BANK_FUNDS_COMMAND_PACKAGE_NAME = 'bank_funds_command';

export interface BankFundsCommandServiceClient {
  depositFunds(request: DepositFundsRequest): Observable<DepositFundsResponse>;

  withdrawFunds(request: WithdrawFundsRequest): Observable<WithdrawFundsResponse>;

  transferFunds(request: TransferFundsRequest): Observable<TransferFundsResponse>;
}

export interface BankFundsCommandServiceController {
  depositFunds(
    request: DepositFundsRequest,
  ): Promise<DepositFundsResponse> | Observable<DepositFundsResponse> | DepositFundsResponse;

  withdrawFunds(
    request: WithdrawFundsRequest,
  ): Promise<WithdrawFundsResponse> | Observable<WithdrawFundsResponse> | WithdrawFundsResponse;

  transferFunds(
    request: TransferFundsRequest,
  ): Promise<TransferFundsResponse> | Observable<TransferFundsResponse> | TransferFundsResponse;
}

export function BankFundsCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['depositFunds', 'withdrawFunds', 'transferFunds'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('BankFundsCommandService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('BankFundsCommandService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BANK_FUNDS_COMMAND_SERVICE_NAME = 'BankFundsCommandService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
