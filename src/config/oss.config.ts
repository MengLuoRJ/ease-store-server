export default () => {
  const oss = {
    provider: process.env.OSS_PROVIDER,
    secretId: '',
    secretKey: '',
    ossBucket: process.env.OSS_BUCKET,
    ossRegion: process.env.OSS_REGION,
  };
  if (oss.provider === 'TencentCloud') {
    oss.secretId = process.env.TENCENT_CLOUD_SECRET_ID;
    oss.secretKey = process.env.TENCENT_CLOUD_SECRET_KEY;
  }
  return { oss: oss };
};
