import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PropertyModule } from './property/property.module';
import { ContractModule } from './contract/contract.module';
import { BillModule } from './bill/bill.module';

@Module({
    imports: [

      AuthModule,
  
      UserModule,
  
      PropertyModule,
  
      ContractModule,
  
      BillModule,
  
    ],
    controllers: [],
    providers: [],
  })
  export class ControllersModule { }