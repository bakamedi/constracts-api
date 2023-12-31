import { Module } from '@nestjs/common';
import { JwtTokenService } from './token.service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { authConfig } from './utils/auth.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: configService.get('JWT_SECRET'),
        }
      }
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class MyJwtModule {}