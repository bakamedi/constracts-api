import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { IJwtServicePayload } from 'src/common/services/token/interfaces/token.interface';
import { JwtTokenService } from 'src/common/services/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtTokenService,
  ) { }

  generateToken(payload: IJwtServicePayload): string {
    return this.jwtService.createToken(payload);
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.checkToken(token);
    } catch (error) {
      throw new Error('Token invalido');
    }
  }

  hashPassword(hashString: string): string {
    return this.bcryptService.hash(hashString);
  }

  compareHashAndPassword(password: string, hashPassword: string): boolean {
    return this.bcryptService.compare(password, hashPassword);
  }


}
