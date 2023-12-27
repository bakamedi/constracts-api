import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from './interfaces/token.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  checkToken(token: string): Promise<any> {
    const decode =  this.jwtService.verify(token);
    return decode;
  }

  createToken(payload: IJwtServicePayload): string {
    return this.jwtService.sign(payload);
  }
}
