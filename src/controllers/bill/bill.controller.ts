import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserE } from '../user/entities/user.entity';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Post()
  create(@GetUser() user: UserE, @Body() createBillDto: CreateBillDto) {
    return this.billService.create(user, createBillDto);
  }

  @Get()
  findAll(
    @GetUser() user: UserE,
    @Query('idContract') idContract: string,
    @Query('idProperty') idProperty: string,
  ) {
    console.log('fdsfsd');
    return this.billService.findAll(user, idContract, idProperty);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('idProperty') idProperty: string,
    @Query('idContract') idContract: string,
    @GetUser() user: UserE,
  ) {
    return this.billService.findOne(id, idContract, idProperty, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser() user: UserE,
    @Body() updateBillDto: UpdateBillDto
  ) {
    return this.billService.update(id, user, updateBillDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query('idProperty') idProperty: string,
    @Query('idContract') idContract: string,
    @GetUser() user: UserE,
  ) {
    return this.billService.remove(id, idProperty, idContract, user);
  }
}
