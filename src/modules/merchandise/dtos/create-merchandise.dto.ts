import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNumber()
  shilf_life: number;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  quick_tags?: string[];
}
