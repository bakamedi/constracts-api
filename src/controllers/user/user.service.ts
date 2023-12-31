import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserE } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/index-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserE)
    private readonly userRepository: Repository<UserE>,

    private readonly authService: AuthService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    console.log(createUserDto);

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

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }, //! OJO!

    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!this.authService.compareHashAndPassword(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

    return {
      ...user,
      token: this.authService.generateToken({ id: user.id, }),
    };
  }

  async getUser(user: UserE): Promise<UserE> {
    const { id } = user;
    const userResp = await this.userRepository.findOne(
      {
        where: { id },
        relations: {
          properties: true,
        }
      }
    );

    delete userResp.password;

    return userResp;
  }

  async updateUser(user: UserE, updateUserDto: UpdateUserDto): Promise<UserE> {
    const { id } = user;

    const userResp = await this.userRepository.findOne(
      {
        where: { id },
        relations: {
          properties: true,
        },
      }
    );

    delete user.password;

    return await this.userRepository.save({
      ...userResp, // existing fields
      ...updateUserDto // updated fields
    });
  }
}
