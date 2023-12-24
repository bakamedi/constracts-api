import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from './utils/auth.config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserController } from '../user/user.controller';

@Module({
  imports: [JwtModule.register(authConfig)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.POST }) // Rutas sin autenticación
      .exclude({ path: 'auth/register', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
