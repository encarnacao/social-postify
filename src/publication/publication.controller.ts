import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/auth.decorator';
import { PublicationDTO, UserData } from 'src/entities';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPublication(@User() user: UserData, @Body() data: PublicationDTO) {
    const publication = await this.publicationService.createPublication(data, user.id);
    delete publication.authorId;
    return publication;
  }
}
