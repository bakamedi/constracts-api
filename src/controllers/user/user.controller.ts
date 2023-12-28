import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserE } from './entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Get('profile')
  findOne(@GetUser() user: UserE): Promise<UserE> {
    return this.userService.getUser(user);
  }

  @Put('profile')
  updateUser(@GetUser() user: UserE, @Body() updateUserDto: UpdateUserDto,): Promise<UserE> {
    return this.userService.updateUser(user, updateUserDto);
  }
}
