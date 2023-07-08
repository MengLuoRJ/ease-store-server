import { Module } from '@nestjs/common';
import { MerchandiseController } from './merchandise.controller';
import { MerchandiseService } from './merchandise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchandise } from '../../entities/merchandise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Merchandise])],
  controllers: [MerchandiseController],
  providers: [MerchandiseService],
})
export class MerchandiseModule {}
