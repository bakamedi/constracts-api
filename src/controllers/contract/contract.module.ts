import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractE } from './entities/contract.entity';
import { UserE } from '../user/entities/user.entity';
import { BillE } from '../bill/entities/bill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractE, UserE, BillE]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule { }
