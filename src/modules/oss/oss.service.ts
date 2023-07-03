import { ConfigService } from '@nestjs/config';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  MODULE_OPTIONS_TOKEN,
  OssModuleOptions,
} from './oss.module-definition';
import { createHash } from 'crypto';
import * as COS from 'cos-nodejs-sdk-v5';

@Injectable()
export class OssService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private ossModuleOption: OssModuleOptions,
    private readonly configService: ConfigService,
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
        Sign: false,
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

  getUrlSigned(url: string) {
    const baseUrl = 'https://' + this.configService.get('OSS_CDN_DOMAIN');
    let path = '';
    if (url.startsWith('https://') || url.startsWith('http://')) {
      if (!url.startsWith(baseUrl)) {
        throw new BadRequestException('Invalid url');
      } else {
        path = url.split(baseUrl)[1].trim();
      }
    } else {
      path = url.trim();
    }
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    const hexTimestamp = Math.floor(Date.now() / 1000).toString(16);
    const pkey = this.configService.get('OSS_CDN_PKEY').trim();
    const hashSource = pkey + path + hexTimestamp;
    const hash = createHash('sha256').update(hashSource).digest('hex');
    const signedUrl = `${baseUrl}/${hash}/${hexTimestamp}${path}`;
    return signedUrl;
  }

  async uploadMerchandisePicture(file: any, fileName: string) {
    const filePath = '/merchandise-picture';
    this.uploadFile(file, filePath, fileName);
    return this.getUrl(filePath, fileName);
  }
}
