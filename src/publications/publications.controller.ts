import { Controller, Get, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/auth.decorator';
import { UserData } from 'src/entities';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getPublications(@User() user: UserData) {
    const publications = await this.publicationsService.getAll(user.id);
    return publications;
  }
}
