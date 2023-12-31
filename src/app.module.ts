import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './common/services/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    DatabaseModule,
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
