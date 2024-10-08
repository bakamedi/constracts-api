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

    @InjectRepository(UserE)
    private readonly userRepository: Repository<UserE>,

  ) { }

  async create(user: UserE, createContractDto: CreateContractDto): Promise<ContractE> {
    const id = user.id;
    const userResp = await this.userRepository.findOne(
      {
        where: { id },
        relations: {
          properties: true,
        }
      }
    );
    const propertyExist = userResp.properties.find((item) => item.id === createContractDto.idProperty);
    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }
    const contractDto = this.contractRepository.create({
      ...createContractDto,
      property: propertyExist
    });
    return await this.contractRepository.save(contractDto);
  }

  async findAll(user: UserE, idProperty: string): Promise<ContractE[]> {
    const id = user.id;
    const userResp = await this.userRepository.findOne(
      {
        where: { id },
        relations: {
          properties: true,
        }
      }
    );

    const propertyExist = userResp.properties.find((item) => item.id === idProperty);

    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }
    return await this.contractRepository.find({
      where: {
        property: {
          id: propertyExist.id
        }
      }
    });
  }

  async findOne(id: string, idProperty: string, user: UserE): Promise<ContractE> {
    const userResp = await this.userRepository.findOne(
      {
        where: { id: user.id },
        relations: {
          properties: true,
        }
      }
    );

    const propertyExist = userResp.properties.find((item) => item.id === idProperty);

    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }
    const contract = await this.contractRepository.findOne({
      where: {
        id: id,
        property: {
          id: propertyExist.id
        }
      }
    });

    return contract;
  }

  async update(
    id: string,
    user: UserE,
    updateContractDto: UpdateContractDto
  ): Promise<ContractE> {

    const userResp = await this.userRepository.findOne(
      {
        where: { id: user.id },
        relations: {
          properties: true,
        }
      }
    );
    const propertyExist = userResp.properties.find((item) => item.id === updateContractDto.idProperty);

    if (!propertyExist) {
      throw new InternalServerErrorException('Contract not found (request)');
    }
    const contract = await this.contractRepository.findOne({
      where: {
        id: id,
        property: {
          id: propertyExist.id
        }
      }
    });

    return await this.contractRepository.save({
      ...contract,
      ...updateContractDto,
    });
  }

  async remove(id: string, idProperty: string, user: UserE) {
    const userResp = await this.userRepository.findOne(
      {
        where: { id: user.id },
        relations: {
          properties: true,
        }
      }
    );

    const propertyExist = userResp.properties.find((item) => item.id === idProperty);

    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }

    const contractExist = await this.contractRepository.findOne({
      where: {
        id: id,
        property: {
          id: propertyExist.id
        }
      }
    });

    if (!contractExist) {
      throw new InternalServerErrorException('Contract not found (request)');
    }

    return await this.contractRepository.delete(contractExist.id);
  }
}
