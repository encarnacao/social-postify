import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/user/user.guard';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
  })],
  controllers: [PublicationController],
  providers: [PublicationService, AuthGuard]
})
export class PublicationModule {}
