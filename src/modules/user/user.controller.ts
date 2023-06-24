import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('admin')
  @Get('/get/all')
  async getAllUser() {
    return await this.userService.findAll();
  }

  @Roles('admin')
  @Get('/get/uuid/:uuid')
  async getUserByUuid(@Param('uuid') uuid: string) {
    return await this.userService.findOne(uuid);
  }

  @Roles('admin')
  @Post('/create')
  async craeteUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUserByPassword(createUserDto);
  }

  // @ApiOperation({ summary: 'Update user - [Roles: admin]' })
  // @Roles('admin')
  // @Patch('/update/:uuid')
  // async updateUser(
  //   @Param('uuid') uuid: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return await this.userService.updateUser(uuid, updateUserDto);
  // }
}
