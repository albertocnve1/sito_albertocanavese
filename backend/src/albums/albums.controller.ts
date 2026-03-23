import { Controller, Get } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('public')
  async getPublicAlbums() {
    return this.albumsService.findAll();
  }
}
