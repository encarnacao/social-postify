import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO } from 'src/entities';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private authService: AuthService) {}

  async create(userData: CreateUserDTO){
    const user = await this.prisma.user.create({ data: userData });
    return this.authService.generateToken(user);
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

}
