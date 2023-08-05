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
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { PageOptionsDto } from '@/common/dtos/pagination.dto';

@Controller('merchandise')
export class MerchandiseController {
  constructor(private readonly merchandiseService: MerchandiseService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30 * 1000)
  @Get('/all/cached')
  async findAllCached(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.merchandiseService.findAll(pageOptionsDto);
  }

  @Get('/all')
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.merchandiseService.findAll(pageOptionsDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30 * 1000)
  @Get('/id/:id/cached')
  async findOneCached(@Param('id') id: number) {
    return await this.merchandiseService.findOne(id);
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: number) {
    return await this.merchandiseService.findOne(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30 * 1000)
  @Get('/barcode/:barcode/cached')
  async findByBarcodeCached(@Param('barcode') barcode: string) {
    return await this.merchandiseService.findByBarcode(barcode);
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
