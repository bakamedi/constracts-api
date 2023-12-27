import { NestMiddleware, Injectable, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtTokenService } from '../../../common/services/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async use(req: Request, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    console.log(bearerHeader);
    console.log(accessToken);


    if (accessToken) {
      try {
        const decoded = await this.jwtTokenService.checkToken(accessToken);
        req['user'] = decoded;
        next();
      } catch (error) {
        throw new BadRequestException('Token invalido');
      }
    } else {
      throw new BadRequestException('Token no proporcionado');
    }
  }
}
