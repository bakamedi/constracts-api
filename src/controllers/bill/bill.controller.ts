import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
