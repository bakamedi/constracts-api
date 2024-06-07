import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyE } from './entities/property.entity';
import { UserE } from '../user/entities/user.entity';
import { ContractE } from '../contract/entities/contract.entity';
import { ImagepropertyE } from '../imageproperty/entities/imageproperty.entity';
import { UploadModule } from 'src/common/services/upload/upload.module';
import { UploadService } from 'src/common/services/upload/upload.service';

@Module({
  imports: [
    UploadModule,
    TypeOrmModule.forFeature([PropertyE, UserE, ContractE, ImagepropertyE],),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, UploadService],
})
export class PropertyModule { }
