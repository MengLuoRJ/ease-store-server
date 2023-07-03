import { CacheInterceptor } from '@nestjs/cache-manager';
import { OssService } from './oss.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

@UseInterceptors(CacheInterceptor)
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('/sign-url')
  async signUrl(@Body('url') url: string) {
    return this.ossService.getUrlSigned(url);
  }
}
