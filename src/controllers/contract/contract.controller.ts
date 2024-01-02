import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { UserE } from '../user/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Post()
  create(@GetUser() user: UserE, @Body() createContractDto: CreateContractDto) {
    return this.contractService.create(user, createContractDto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
