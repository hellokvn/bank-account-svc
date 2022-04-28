import { ExceptionFilter, Catch, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status: HttpStatus = exception.getStatus();
    const error: string | object | any = exception.getResponse();
    const timestamp: string = new Date().toISOString();

    if (typeof error === 'string') {
      return { status, timestamp, error: [error] };
    }

    return { status, timestamp, error: error.message };
  }
}
