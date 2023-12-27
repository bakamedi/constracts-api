import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './common/services/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
