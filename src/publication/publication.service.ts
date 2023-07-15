import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationDTO } from 'src/entities';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PublicationService {
  constructor(private prisma: PrismaService) {}

  private async checkConflicts(authorId: number, title: string) {
    const userPublications = await this.prisma.publication.findMany({
      where: { authorId },
    });
    const invalidTitle = userPublications.some(
      (publication) => publication.title === title,
    );
    if (invalidTitle)
      throw new HttpException('Title already exists', HttpStatus.CONFLICT);
  }

  async createPublication(data: PublicationDTO, userId: number) {
    await this.checkConflicts(userId, data.title);
    const newPublication = await this.prisma.publication.create({
      data: {
        ...data,
        dateToPublish: new Date(data.dateToPublish),
        authorId: userId,
      },
    });
    return newPublication;
  }
}
