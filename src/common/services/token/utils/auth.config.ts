// jwt.config.ts
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'tu_secreto_secreto', // Cambia esto por una clave secreta más segura
};

export const authConfig: JwtModuleOptions = {
  secret: jwtConstants.secret,
};
