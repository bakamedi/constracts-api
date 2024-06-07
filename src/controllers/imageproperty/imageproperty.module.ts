import { Module } from '@nestjs/common';
import { ImagepropertyService } from './imageproperty.service';
import { ImagepropertyController } from './imageproperty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyE } from '../property/entities/property.entity';
import { ImagepropertyE } from './entities/imageproperty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagepropertyE, PropertyE]),
  ],
  controllers: [ImagepropertyController],
  providers: [ImagepropertyService],
})
export class ImagepropertyModule {}
