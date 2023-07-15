import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [SigninController],
  providers: [SigninService, PrismaService],
})
export class SigninModule {}
