import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginTelnumDto {
  @ApiProperty({
    description: 'User Telephone Number',
    example: '+8612345678912',
  })
  @IsString()
  @IsPhoneNumber()
  telnum: string;

  @ApiProperty({
    description: 'User Password',
  })
  @IsString()
  password: string;
}
