import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PublicationService {
  constructor(private prisma: PrismaService, authService: AuthService) {}
}
