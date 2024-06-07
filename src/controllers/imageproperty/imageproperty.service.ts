import { Injectable } from '@nestjs/common';
import { CreateImagepropertyDto } from './dto/create-imageproperty.dto';
import { UpdateImagepropertyDto } from './dto/update-imageproperty.dto';

@Injectable()
export class ImagepropertyService {
  create(createImagepropertyDto: CreateImagepropertyDto) {
    return 'This action adds a new imageproperty';
  }

  findAll() {
    return `This action returns all imageproperty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageproperty`;
  }

  update(id: number, updateImagepropertyDto: UpdateImagepropertyDto) {
    return `This action updates a #${id} imageproperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageproperty`;
  }
}
