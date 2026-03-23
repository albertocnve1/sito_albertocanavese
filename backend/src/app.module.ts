import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [PrismaModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
