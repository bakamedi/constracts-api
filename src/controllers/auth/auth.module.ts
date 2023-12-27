import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserController } from '../user/user.controller';
import { MyJwtModule } from 'src/common/services/token/token.module';
import { BcryptModule } from 'src/common/services/bcrypt/bcrypt.module';

@Module({
  imports: [MyJwtModule,BcryptModule],
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
