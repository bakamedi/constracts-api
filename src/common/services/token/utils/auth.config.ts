// jwt.config.ts
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants = {
  secret: process.env.JWT_SECRET, // Cambia esto por una clave secreta más segura
};

export const authConfig: JwtModuleOptions = {
  secret: jwtConstants.secret,
};
