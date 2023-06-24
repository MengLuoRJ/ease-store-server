import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { RedisCacheService } from 'src/modules/redis-cache/redis-cache.service';
import { User } from 'src/entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisCacheService: RedisCacheService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          request?.cookies
            ? request.cookies[configService.get<string>('JWT_COOKIE_NAME')]
            : null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    } as StrategyOptions);
  }

  async validate(request: any, payload: any) {
    const token = ExtractJwt.fromExtractors([
      (request: Request) =>
        request?.cookies
          ? request.cookies[this.configService.get<string>('JWT_COOKIE_NAME')]
          : null,
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ])(request);
    const ua = request.headers['user-agent'];
    const ip = request.headers['x-forwarded-for']
      ? request.headers['x-forwarded-for'].split(',')[0].trim()
      : request.headers['x-real-ip'];
    // get cacheed token
    const cachedToken = await this.redisCacheService.get(
      `jwt-token:${payload.uuid}:${ua}`,
    );
    // check if token exists and is valid
    if (
      !cachedToken ||
      token !== cachedToken ||
      payload.ua !== ua ||
      payload.ip !== ip
    ) {
      throw new UnauthorizedException('Unauthorized token');
    }
    // get user
    const user = await this.userRepository.findOne({
      where: {
        uuid: payload.uuid,
      },
    });
    // check if user exists
    if (!user) {
      throw new UnauthorizedException('Unauthorized user');
    }
    await this.redisCacheService.set(
      ua ? `jwt-token:${payload.uuid}:${ua}` : `jwt-token:${payload.uuid}`,
      token,
      30 * 24 * 60 * 60 * 1000,
    );
    // return user
    return {
      uuid: user.uuid,
      username: user.username,
      roles: payload.roles,
    };
  }
}
