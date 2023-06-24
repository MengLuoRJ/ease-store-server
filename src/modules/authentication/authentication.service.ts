import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signToken(uuid: string, ua?: string, ip?: string) {
    const token = this.jwtService.sign({ uuid, ua, ip });
    await this.redisCacheService.set(
      ua ? `jwt-token:${uuid}:${ua}` : `jwt-token:${uuid}`,
      token,
      30 * 24 * 60 * 60 * 1000,
    );
    return { token };
  }

  async removeToken(uuid: string, ua?: string) {
    await this.redisCacheService.del(
      ua ? `jwt-token:${uuid}:${ua}` : `jwt-token:${uuid}`,
    );
  }

  async validateUserByPassword(telnum: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        telnum: telnum,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Password not match');
    }
    delete user.password;
    return user;
  }
}
