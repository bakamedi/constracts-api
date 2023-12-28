import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PropertyModule } from './property/property.module';

@Module({
    imports: [

      AuthModule,
  
      UserModule,
  
      PropertyModule,
  
    ],
    controllers: [],
    providers: [],
  })
  export class ControllersModule { }