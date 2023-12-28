import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserController } from '../user/user.controller';
import { MyJwtModule } from 'src/common/services/token/token.module';
import { BcryptModule } from 'src/common/services/bcrypt/bcrypt.module';

@Module({
  imports: [MyJwtModule,BcryptModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/login', method: RequestMethod.POST }) // Rutas sin autenticación
      .exclude({ path: 'user/register', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
