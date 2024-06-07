import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PropertyModule } from './property/property.module';
import { ContractModule } from './contract/contract.module';
import { BillModule } from './bill/bill.module';
import { ImagepropertyModule } from './imageproperty/imageproperty.module';

@Module({
    imports: [

      AuthModule,
  
      UserModule,
  
      PropertyModule,
  
      ContractModule,
  
      BillModule,
  
      ImagepropertyModule,
  
    ],
    controllers: [],
    providers: [],
  })
  export class ControllersModule { }