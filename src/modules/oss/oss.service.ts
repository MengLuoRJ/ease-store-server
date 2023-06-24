import { Inject, Injectable } from '@nestjs/common';
import {
  MODULE_OPTIONS_TOKEN,
  OssModuleOptions,
} from './oss.module-definition';
import { default as COS } from 'cos-nodejs-sdk-v5';

@Injectable()
export class OssService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private ossModuleOption: OssModuleOptions,
  ) {}

  private bucket: string = this.ossModuleOption.ossBucket;
  private region: string = this.ossModuleOption.ossRegion;
  private cos = () => {
    if (this.ossModuleOption.provider === 'TencentCloud') {
      return new COS({
        SecretId: this.ossModuleOption.secretId,
        SecretKey: this.ossModuleOption.secretKey,
      });
    }
  };

  private uploadFile(file: any, filePath: string, fileName: string) {
    return this.cos().putObject(
      {
        Bucket: this.bucket,
        Region: this.region,
        Key: `${filePath}/${fileName}`,
        Body: file,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        }
        return data;
      },
    );
  }

  private getUrl(filePath: string, fileName: string) {
    return this.cos().getObjectUrl(
      {
        Bucket: this.bucket,
        Region: this.region,
        Key: `${filePath}/${fileName}`,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        }
        const url = data.Url;
        return url;
      },
    );
  }

  async uploadMerchandisePicture(file: any, fileName: string) {
    const filePath = '/merchandise-picture';
    this.uploadFile(file, filePath, fileName);
    return this.getUrl(filePath, fileName);
  }
}
