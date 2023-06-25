import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMerchandiseDto {
  @IsString()
  name: string;

  @IsString()
  barcode: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  picture_url?: string;

  @IsOptional()
  @IsString()
  specs?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  shilf_life: number;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @IsString()
  quick_tags?: string;
}
