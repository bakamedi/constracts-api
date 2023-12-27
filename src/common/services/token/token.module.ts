import { Module } from '@nestjs/common';
import { JwtTokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from './utils/auth.config';

@Module({
  imports: [
    JwtModule.register(authConfig)
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class MyJwtModule {}