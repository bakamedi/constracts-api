import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserE } from '../user/entities/user.entity';
import { ContractE } from '../contract/entities/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserE, ContractE]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
