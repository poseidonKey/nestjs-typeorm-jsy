import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Get('users')
  async getUser() {
    return await this.userRepository.find({
      // select: {
      //   id: true,
      //   title: true,
      // },
    });
  }
  @Post('users')
  async postUser() {
    return await this.userRepository.save({
      title: 'test title',
    });
  }
  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    return await this.userRepository.save({
      ...user,
      title: user.title + '0',
    });
  }
}
