import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  async getAll(authorId: number) {
    const publications = await this.prisma.publication.findMany({
      where: {
        authorId: authorId,
      },
      orderBy: {
        dateToPublish: 'desc',
      },
    });
    publications.forEach((publication) => {
      delete publication.authorId;
    });
    return publications;
  }
}
