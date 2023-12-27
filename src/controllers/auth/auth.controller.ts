import { Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register() {
    return 'AQUI SE REFISTRA';
  }

  @Post('/login')
  login() {
    return 'AQUI SE REFISTRA';
  }

}
