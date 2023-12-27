import { Injectable } from '@nestjs/common';
import { JwtTokenService } from 'src/common/services/token/token.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtTokenService) { }

  generateToken(payload: any): string {
    return this.jwtService.createToken(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.checkToken(token);
    } catch (error) {
      throw new Error('Token invalido');
    }
  }
}
