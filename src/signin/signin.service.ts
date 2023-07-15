import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDTO } from 'src/entities';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class SigninService {
  constructor(private prisma: PrismaService, private authService: AuthService) {}
  async signin(body: LoginUserDTO){
    const token = await this.authService.checkLogin(body.email, body.password);
    return token;
  }
}
