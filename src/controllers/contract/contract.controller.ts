import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { UserE } from '../user/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ContractE } from './entities/contract.entity';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Post()
  create(@GetUser() user: UserE, @Body() createContractDto: CreateContractDto) {
    return this.contractService.create(user, createContractDto);
  }

  @Get('')
  async findAll(
    @Query('idProperty') idProperty: string, 
    @GetUser() user: UserE
  ): Promise<ContractE[]> {
    return await this.contractService.findAll(user, idProperty);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('idProperty') idProperty: string,
    @GetUser() user: UserE
  ): Promise<ContractE> {
    return await this.contractService.findOne(id, idProperty, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetUser() user: UserE,
    @Body() updateContractDto: UpdateContractDto
  ): Promise<ContractE> {
    return await this.contractService.update(id, user, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
