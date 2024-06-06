import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserE } from '../user/entities/user.entity';
import { PropertyE } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/shared/pagination.dto';
import { PaginatedResult } from 'src/common/shared/paginated-result.interface';

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

  async findAll(user: UserE, paginationDto: PaginationDto): Promise<PaginatedResult<PropertyE>>{
    const { page, limit } = paginationDto;
    const [results, total] = await this.propertyRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        propertyUser: {
          id: user.id
        }
      }
    });

    if (!results) {
      throw new InternalServerErrorException('Property not found (request)');
    }
    return {
      data: [...results],
      total,
      page,
      limit,
    };
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
