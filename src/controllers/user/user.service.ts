import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly authService: AuthService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const user = this.userRepository.create({
      ...userData,
      password: this.authService.hashPassword(password)
    });

    await this.userRepository.save(user)
    delete user.password;

    return {
      ...user,
      token: this.authService.generateToken({ id: user.id }),
    };

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
