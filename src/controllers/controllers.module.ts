import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PropertyModule } from './property/property.module';
import { ContractModule } from './contract/contract.module';

@Module({
    imports: [

      AuthModule,
  
      UserModule,
  
      PropertyModule,
  
      ContractModule,
  
    ],
    controllers: [],
    providers: [],
  })
  export class ControllersModule { }