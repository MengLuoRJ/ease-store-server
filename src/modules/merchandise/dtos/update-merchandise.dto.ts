import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMerchandiseDto } from './create-merchandise.dto';

export class UpdateMerchandiseDto extends PartialType(CreateMerchandiseDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  shilf_life?: number;
}
