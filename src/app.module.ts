import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchandiseModule } from './modules/merchandise/merchandise.module';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OssModule } from './modules/oss/oss.module';
import postgresqlConfig from './config/postgresql.config';
import redisConfig from './config/redis.config';
import ossConfig from './config/oss.config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    // basic function modules
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [postgresqlConfig, redisConfig, ossConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('postgresql'),
      }),
      inject: [ConfigService],
    }),
    OssModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('oss'),
      }),
      inject: [ConfigService],
    }),
    RedisCacheModule,
    MerchandiseModule,
    UserModule,
    AuthenticationModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    AppService,
  ],
})
export class AppModule {}
