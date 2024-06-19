import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Get('users')
  async getUser() {
    return await this.userRepository.find({
      relations: {
        profile: true,
        posts: true,
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

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'post@codefactory.ai',
    });
    await this.postRepository.save({
      title: 'post Title',
      author: user,
    });
    await this.postRepository.save({
      title: 'post Title 2',
      author: user,
    });
    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'post test 1',
    });
    const post2 = await this.postRepository.save({
      title: 'post test 2',
    });
    const tag1 = await this.tagRepository.save({
      name: 'tag 1',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'tag 2',
      posts: [post2],
    });
    await this.postRepository.save({
      title: 'post test3',
      tags: [tag1, tag2],
    });
    return true;
  }
  @Get('/posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }
  @Get('/tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
