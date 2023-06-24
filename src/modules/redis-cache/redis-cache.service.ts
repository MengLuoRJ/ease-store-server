import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl).catch((err) => {
      throw err;
    });
  }

  async get(key: string): Promise<unknown> {
    return await this.cacheManager.get(key);
  }

  async del(key: string): Promise<void> {
    this.cacheManager.del(key).catch((err) => {
      throw err;
    });
  }
}
