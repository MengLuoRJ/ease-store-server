import { ConfigurableModuleClass } from './oss.module-definition';
import { Module, Global } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';

@Global()
@Module({
  imports: [],
  providers: [OssService],
  exports: [OssService],
  controllers: [OssController],
})
export class OssModule extends ConfigurableModuleClass {}
