import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
}
