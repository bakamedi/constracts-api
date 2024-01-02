import { Module } from '@nestjs/common';
import { JwtTokenService } from './token.service';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
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