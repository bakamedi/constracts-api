import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyE } from './entities/property.entity';
import { UserE } from '../user/entities/user.entity';
import { ContractE } from '../contract/entities/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyE, UserE, ContractE]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule { }
