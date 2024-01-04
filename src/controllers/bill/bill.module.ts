import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractE } from '../contract/entities/contract.entity';
import { BillE } from './entities/bill.entity';
import { UserE } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillE, UserE, ContractE]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule { }
