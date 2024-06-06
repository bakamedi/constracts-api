import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './common/services/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '..', 'uploads'), // Ruta absoluta para el directorio de subida
    }),
    ConfigModule.forRoot(),

    DatabaseModule,
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
