import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserController } from '../user/user.controller';
import { MyJwtModule } from 'src/common/services/token/token.module';
import { BcryptModule } from 'src/common/services/bcrypt/bcrypt.module';
import { PropertyController } from '../property/property.controller';

@Module({
  imports: [MyJwtModule, BcryptModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user/register', method: RequestMethod.POST },
        { path: 'user/login', method: RequestMethod.POST },
      )
      .forRoutes(UserController, PropertyController);
  }
}
