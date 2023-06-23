import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchandiseModule } from './modules/merchandise/merchandise.module';

@Module({
  imports: [MerchandiseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
