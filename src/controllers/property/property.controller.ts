import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserE } from '../user/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PropertyE } from './entities/property.entity';
import { PaginationDto } from 'src/common/shared/pagination.dto';
import { PaginatedResult } from 'src/common/shared/paginated-result.interface';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  create(
    @GetUser() user: UserE,
    @UploadedFile() files,
    @Body() createPropertyDto: CreatePropertyDto,
    @Request() req,
  ) {
    req.user = user;
    req['user'] = user;
    return this.propertyService.create(user, createPropertyDto, req, files);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @GetUser() user: UserE,
  ): Promise<PaginatedResult<PropertyE>>  {
    return this.propertyService.findAll(user, paginationDto);
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
