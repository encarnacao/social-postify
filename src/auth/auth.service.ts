import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token) as { email: string };
      return data;
    } catch (error) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  generateToken(user: User) {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  async checkLogin(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return this.generateToken(user);
      } else {
        throw new HttpException('Invalid email of password', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException('Invalid email of password', HttpStatus.NOT_FOUND);
    } 
  }
}
