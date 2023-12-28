import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TypeORMErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.code === '23505')
          throw new BadRequestException('El Usuario ya existe');

        if (error instanceof QueryFailedError) {
          console.log(error);
        
          // Puedes personalizar el manejo del error de TypeORM aquí
          console.error('Error de TypeORM:', error.message);

          // Ejemplo de cómo podrías devolver un error HTTP personalizado
          return throwError(new HttpException('Error en la consulta', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        return throwError(error);
      }),
    );
  }
}
