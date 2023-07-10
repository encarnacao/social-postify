import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SigninModule } from './signin/signin.module';
import { PublicationModule } from './publication/publication.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [UserModule, SigninModule, PublicationModule, PublicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
