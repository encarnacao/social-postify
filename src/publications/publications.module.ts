import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/user/user.guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService, AuthGuard, UserService, PrismaService]
})
export class PublicationsModule {}
