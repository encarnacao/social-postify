import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { LoginUserDTO } from 'src/entities';

@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post()
  async signin(@Body() body: LoginUserDTO) {
    const token = await this.signinService.signin(body);
    return { authToken: token };
  }
}
