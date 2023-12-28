import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: 'postgres',
      password: 'MY_secret_123$4',
      autoLoadEntities: true,
      synchronize: true,
      migrations: ["dist/migrations/*{.ts,.js}"],
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule { }