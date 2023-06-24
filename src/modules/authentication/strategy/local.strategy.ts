import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: 'telnum',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(request: any, telnum: string, password: string): Promise<any> {
    const user = await this.authenticationService.validateUserByPassword(
      telnum,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
