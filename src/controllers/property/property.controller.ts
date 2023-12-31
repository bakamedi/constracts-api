import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserE } from '../user/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PropertyE } from './entities/property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post()
  create(@GetUser() user: UserE, @Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(user, createPropertyDto);
  }

  @Get()
  findAll(@GetUser() user: UserE): Promise<PropertyE[]> {
    return this.propertyService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: UserE) {
    return this.propertyService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @GetUser() user: UserE, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(user, id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserE) {
    return this.propertyService.remove(user, id);
  }
}
