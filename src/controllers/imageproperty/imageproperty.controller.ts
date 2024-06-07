import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagepropertyService } from './imageproperty.service';
import { CreateImagepropertyDto } from './dto/create-imageproperty.dto';
import { UpdateImagepropertyDto } from './dto/update-imageproperty.dto';

@Controller('imageproperty')
export class ImagepropertyController {
  constructor(private readonly imagepropertyService: ImagepropertyService) {}

  @Post()
  create(@Body() createImagepropertyDto: CreateImagepropertyDto) {
    return this.imagepropertyService.create(createImagepropertyDto);
  }

  @Get()
  findAll() {
    return this.imagepropertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagepropertyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagepropertyDto: UpdateImagepropertyDto) {
    return this.imagepropertyService.update(+id, updateImagepropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagepropertyService.remove(+id);
  }
}
