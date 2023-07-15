import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/user/user.guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
  })],
  controllers: [PublicationController],
  providers: [PublicationService, AuthGuard,  UserService, PrismaService]
})
export class PublicationModule {}
