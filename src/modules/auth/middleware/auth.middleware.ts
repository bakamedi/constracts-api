import { NestMiddleware, Injectable, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    console.log(bearerHeader);
    console.log(accessToken);


    if (accessToken) {
      try {
        const decoded = await this.authService.verifyToken(accessToken);
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
