import { ConfigurableModuleClass } from './oss.module-definition';
import { Module, Global } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 10,
    }),
  ],
  providers: [OssService],
  exports: [OssService],
  controllers: [OssController],
})
export class OssModule extends ConfigurableModuleClass {}
