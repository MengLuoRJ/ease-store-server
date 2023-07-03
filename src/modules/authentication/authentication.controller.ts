import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from '../../common/decorators/public.decorator';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { LoginTelnumDto } from './dtos/login-telnum.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('sync-authentication')
  async syncAuthentication(@Request() request: any) {
    return request.user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loginUsingTelnumPassword(
    @Body() loginTelnumDto: LoginTelnumDto,
    @Request() request: any,
  ) {
    // return signed token
    return await this.authenticationService.signToken(
      request.user.uuid,
      request.headers['user-agent'],
    );
  }

  @Post('logout')
  async logout(@Body('token') token: string, @Request() request: any) {
    return await this.authenticationService.removeToken(
      request.user.uuid,
      request.headers['user-agent'],
    );
  }
}
