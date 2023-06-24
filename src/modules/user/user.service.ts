import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(uuid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        uuid,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOneByTelnum(telnum: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        telnum,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUserByPassword(createUserDto: CreateUserDto) {
    const hasedPassword = await hash(createUserDto.password, await genSalt());
    const user = this.userRepository.create({
      ...createUserDto,
      password: hasedPassword,
    });
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }
}
