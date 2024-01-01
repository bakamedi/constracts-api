import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractE } from './entities/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractE]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule { }
