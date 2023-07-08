import { OssService } from './../oss/oss.service';
import { CreateMerchandiseDto } from './dtos/create-merchandise.dto';
import { Merchandise } from '../../entities/merchandise.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dtos/pagination.dto';

@Injectable()
export class MerchandiseService {
  constructor(
    private readonly ossService: OssService,
    @InjectRepository(Merchandise)
    private readonly merchandiseRepository: Repository<Merchandise>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Merchandise>> {
    const query = this.merchandiseRepository.createQueryBuilder('merchandise');
    const [items, itemCount] = await query
      .orderBy('merchandise.created_at', 'DESC')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(items, pageMetaDto);
  }

  async findOne(id: number): Promise<Merchandise> {
    return await this.merchandiseRepository.findOne({
      where: { id },
    });
  }

  async findByBarcode(barcode: string): Promise<Merchandise[]> {
    return await this.merchandiseRepository.find({
      where: { barcode },
    });
  }

  async findByName(name: string): Promise<Merchandise[]> {
    return await this.merchandiseRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async uploadPicture(barcode: string, file: Express.Multer.File) {
    const fileName =
      'merchandise-' +
      barcode +
      '-' +
      uuid().slice(0, 8) +
      file.originalname.substring(file.originalname.lastIndexOf('.'));
    await this.ossService.uploadMerchandisePicture(file.buffer, fileName);
    return '/merchandise-picture/' + fileName;
  }

  async create(
    createMerchandiseDto: CreateMerchandiseDto,
  ): Promise<Merchandise> {
    const merchandise = this.merchandiseRepository.create(createMerchandiseDto);
    return await this.merchandiseRepository.save(merchandise);
  }

  async update(id: number, updateMerchandiseDto: CreateMerchandiseDto) {
    const merchandise = await this.merchandiseRepository.preload({
      id,
      ...updateMerchandiseDto,
    });
    if (!merchandise) {
      throw new NotFoundException(`Merchandise with id ${id} not found`);
    }
    return await this.merchandiseRepository.save(merchandise);
  }

  async remove(id: number) {
    const merchandise = await this.findOne(id);
    return await this.merchandiseRepository.remove(merchandise);
  }
}
