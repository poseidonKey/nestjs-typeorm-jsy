import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Get('users')
  async getUser() {
    return await this.userRepository.find({
      relations: {
        profile: true,
      },
      // select: {
      //   id: true,
      //   title: true,
      // },
    });
  }
  @Post('users')
  async postUser() {
    return await this.userRepository.save({
      email: 'test@test.ai',
    });
  }
  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    return await this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
    });
    await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });
    return user;
  }
}
