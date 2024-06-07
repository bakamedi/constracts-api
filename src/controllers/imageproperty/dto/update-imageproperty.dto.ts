import { PartialType } from '@nestjs/swagger';
import { CreateImagepropertyDto } from './create-imageproperty.dto';

export class UpdateImagepropertyDto extends PartialType(CreateImagepropertyDto) {}
