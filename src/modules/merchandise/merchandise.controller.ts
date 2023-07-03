import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMerchandiseDto } from './dtos/create-merchandise.dto';
import { MerchandiseService } from './merchandise.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PageOptionsDto } from '@/common/dtos/pagination.dto';

@UseInterceptors(CacheInterceptor)
@Controller('merchandise')
export class MerchandiseController {
  constructor(private readonly merchandiseService: MerchandiseService) {}

  @Get('/all')
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.merchandiseService.findAll(pageOptionsDto);
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: number) {
    return await this.merchandiseService.findOne(id);
  }

  @Get('/barcode/:barcode')
  async findByBarcode(@Param('barcode') barcode: string) {
    return await this.merchandiseService.findByBarcode(barcode);
  }

  @Get('/name')
  async findByName(@Query('name') name: string) {
    return await this.merchandiseService.findByName(name);
  }

  @Post('/upload-picture/:barcode')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDemandPic(
    @Param('barcode') barcode: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.merchandiseService.uploadPicture(barcode, file);
  }

  @Post('/create')
  async create(@Body() createMerchandiseDto: CreateMerchandiseDto) {
    return await this.merchandiseService.create(createMerchandiseDto);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateMerchandiseDto: CreateMerchandiseDto,
  ) {
    return await this.merchandiseService.update(id, updateMerchandiseDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.merchandiseService.remove(id);
  }
}
