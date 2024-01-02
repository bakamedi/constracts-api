import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { UserE } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractE } from './entities/contract.entity';

@Injectable()
export class ContractService {

  constructor(

    @InjectRepository(ContractE)
    private readonly contractRepository: Repository<ContractE>,

  ) { }

  async create(user: UserE, createContractDto: CreateContractDto): Promise<ContractE> {
    const propertyExist = user.properties.find((item) => item.id === createContractDto.idProperty);
    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }
    const contractDto = this.contractRepository.create(createContractDto);
    return await this.contractRepository.save(contractDto);
  }

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
