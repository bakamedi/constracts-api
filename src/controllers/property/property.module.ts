import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyE } from './entities/property.entity';
import { UserE } from '../user/entities/user.entity';
import { ContractE } from '../contract/entities/contract.entity';
import { ImagepropertyE } from '../imageproperty/entities/imageproperty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyE, UserE, ContractE, ImagepropertyE],),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule { }
