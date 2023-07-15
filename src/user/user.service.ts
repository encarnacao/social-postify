import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/entities';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  generateToken(user: User) {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  async create(userData: CreateUserDTO){
    const user = await this.prisma.user.create({ data: userData });
    return this.generateToken(user);
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token) as { email: string };
      return data;
    } catch (error) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
