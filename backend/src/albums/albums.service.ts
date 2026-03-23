import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany({
      where: { isPrivate: false },
    });
  }

  // More methods will be added here
}
