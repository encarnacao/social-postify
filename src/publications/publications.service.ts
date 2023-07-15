import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}
}
