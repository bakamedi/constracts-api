import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillE } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { ContractE } from '../contract/entities/contract.entity';
import { UserE } from '../user/entities/user.entity';

@Injectable()
export class BillService {

  constructor(

    @InjectRepository(BillE)
    private readonly billRepository: Repository<BillE>,

    @InjectRepository(ContractE)
    private readonly contractRepository: Repository<ContractE>,

    @InjectRepository(UserE)
    private readonly userRepository: Repository<UserE>,

  ) { }

  async create(user: UserE, createBillDto: CreateBillDto): Promise<BillE> {

    const id = user.id;
    const userResp = await this.userRepository.findOne(
      {
        where: { id },
        relations: {
          properties: true,
        }
      }
    );

    const propertyExist = userResp.properties.find((item) => item.id === createBillDto.idProperty);
    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }

    const contractExist = await this.contractRepository.findOne(
      {
        where: { id: createBillDto.idContract },
      }
    );

    if (!contractExist) {
      throw new InternalServerErrorException('Contract not found (request)');
    }

    const billDto = this.billRepository.create({
      ...createBillDto,
      contract: contractExist,
    });

    return await this.billRepository.save(billDto);
  }

  async findAll(user: UserE, idContract: string, idProperty: string): Promise<BillE[]> {
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

    const contractExist = await this.contractRepository.findOne(
      {
        where: { id: idContract },
      }
    );

    if (!contractExist) {
      throw new InternalServerErrorException('Contract not found (request)');
    }

    return await this.billRepository.find({
      where: {
        contract: {
          id: contractExist.id
        }
      }
    });
  }

  async findOne(id: string, idContract: string, idProperty: string, user: UserE): Promise<BillE> {
    const idUser = user.id;

    const userResp = await this.userRepository.findOne(
      {
        where: { id: idUser },
        relations: {
          properties: true,
        }
      }
    );

    const propertyExist = userResp.properties.find((item) => item.id === idProperty);
    if (!propertyExist) {
      throw new InternalServerErrorException('Property not found (request)');
    }

    const contractExist = await this.contractRepository.findOne(
      {
        where: { id: idContract },
      }
    );

    if (!contractExist) {
      throw new InternalServerErrorException('Contract not found (request)');
    }

    return await this.billRepository.findOne({
      where: {
        id: id,
        contract: {
          id: contractExist.id
        }
      }
    });
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
