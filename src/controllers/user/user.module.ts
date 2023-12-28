import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserE } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { PropertyE } from '../property/entities/property.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserE, PropertyE]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule { }
