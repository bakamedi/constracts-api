import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserE } from '../user/entities/user.entity';
import { PropertyE } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {

  constructor(

    @InjectRepository(PropertyE)
    private readonly propertyRepository: Repository<PropertyE>,

  ) { }

  async create(user: UserE, createPropertyDto: CreatePropertyDto): Promise<PropertyE> {
    console.log(user);
    const propertyDto = this.propertyRepository.create({
      ...createPropertyDto,
      propertyUser: user,
    });
    return await this.propertyRepository.save(propertyDto);

  }

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
