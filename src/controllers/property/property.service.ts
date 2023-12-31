import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const propertyDto = this.propertyRepository.create({
      ...createPropertyDto,
      propertyUser: user,
    });
    return await this.propertyRepository.save(propertyDto);

  }

  async findAll(user: UserE): Promise<PropertyE[]> {
    console.log(user);
    const properties = await this.propertyRepository.find({
      where: {
        propertyUser: {
          id: user.id
        }
      }
    });

    if (!properties) {
      throw new InternalServerErrorException('Property not found (request)');
    }
    return properties;
  }

  async findOne(id: string, user: UserE): Promise<PropertyE> {
    const property = await this.propertyRepository.findOne({
      where: {
        id: id,
        propertyUser: {
          id: user.id
        }
      },
    });

    return property;
  }

  async update(user: UserE, id: string, updatePropertyDto: UpdatePropertyDto): Promise<PropertyE> {
    const property = await this.propertyRepository.findOne({
      where: {
        id: id,
        propertyUser: {
          id: user.id
        }
      },
    });
    if (!property)
      throw new InternalServerErrorException('Property not found (request)');

    return await this.propertyRepository.save({
      ...property,
      ...updatePropertyDto,
    });
  }

  async remove(user: UserE, id: string) {
    const property = await this.propertyRepository.findOne({
      where: {
        id: id,
        propertyUser: {
          id: user.id
        }
      },
    });
    if (!property)
      throw new InternalServerErrorException('Property not found (request)');

    return await this.propertyRepository.delete(id);
  }
}
