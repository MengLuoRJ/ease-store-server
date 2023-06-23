import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface OssModuleOptions {
  provider: string;
  secretId: string;
  secretKey: string;
  ossBucket: string;
  ossRegion: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<OssModuleOptions>({
    moduleName: 'OssModule',
  }).build();
