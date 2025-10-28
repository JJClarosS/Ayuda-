// date-serializer.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.transformDates(data)),
    );
  }

  private transformDates(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.transformDates(item));
    }
    if (data && typeof data === 'object') {
      for (const key of Object.keys(data)) {
        if (data[key] instanceof Date) {
          data[key] = data[key].toISOString();
        } else if (data[key] && typeof data[key] === 'object') {
          data[key] = this.transformDates(data[key]);
        }
      }
    }
    return data;
  }
}