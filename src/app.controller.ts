import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  // ILike,
  // LessThan,
  // Between,
  // Equal,
  // In,
  // IsNull,
  // LessThan,
  // LessThanOrEqual,
  // Like,
  // MoreThan,
  // MoreThanOrEqual,
  // Not,
  Repository,
} from 'typeorm';
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
      where: {
        // 아닌 경우 가져오기 id가 1이 아닌 데이터를 가져와라.
        // id: Not(1),
        // id가 30보다 작은 데이터
        // id: LessThan(5),
        // id: LessThanOrEqual(5),
        // id:MoreThan(5)
        // id: MoreThanOrEqual(5),
        // id: Equal(5), // id가 5인 데이터. id:5 와 같다.
        // 대문자, 소문자 구분하지 마라. ILike('%Google%')
        // email: Like('%0%'),
        // id: Between(10, 15),
        // 해당되는 여러개의 데이터
        // id: In([1, 3, 5, 7]),
        // id: IsNull(),
      },
      // relations: {
      //   profile: true,
      //   posts: true,
      // },
      /**
       * 어떤 프로퍼티를 선택할 지
       * 기본은 모든 프로퍼티를 가져온다
       * select 를 정의하면 정의 된 프로퍼티들만 가져오게 된다.
       */
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      /**
       * 필터링 할 조건을 입력하게 된다
       * 기본은 and 조건으로 처리
       */
      // where: {
      //   id: 1,
      //   profile: { id: 1 },
      // },
      // []로 처리하면 or로 가져온다
      // where: [{ id: 1 }, { version: 1 }],
      order: {
        id: 'ASC',
        // id: 'DESC',
      },
      // 처음 데이터를 몇 개 제외한다. 기본 0. 모두 가져온다.
      // skip: 0,
      // 데이터를 몇 개 가져올까 기본 0. 모두 가져온다.
      // take: 0,
    });
  }
  @Post('users')
  async postUser() {
    // return await this.userRepository.save({
    //   email: 'test@test.ai',
    // });
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user - ${i}@google.com`,
      });
    }
  }

  @Post('sample')
  async sample() {
    // 모델에 해당 되는 객체만 생성한다. db에 저장은 하지 않음
    // const user1 = await this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력 된 값으로 데이터베이스에서 가져온 값 들을 대체함
    // 데이터베이스에 저장하진 않는다.
    // const user = await this.userRepository.preload({
    //   id: 50,
    //   email: 'test@jsy.com',
    // });

    // 삭제하기
    // await this.userRepository.delete({
    //   id: 50,
    // });

    // 프로퍼티에 값을 증가
    // await this.userRepository.increment(
    //   {
    //     id: 2,
    //   },
    //   'count',
    //   2,
    // );
    // await this.userRepository.decrement(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   2,
    // );

    // 갯수 카운트 하기
    // const cnt = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });
    // 프로퍼티 값 합계 구하기
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(10),
    // });
    //최소값 구하기
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(10),
    // });
    // const max = await this.userRepository.maximum('count', { id: LessThan(5) });
    // const users = await this.userRepository.find();
    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    const usersAndCount = await this.userRepository.findAndCount({
      where: {},
      take: 3,
    });
    return usersAndCount;
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
      profile: {
        profileImg: 'asdf.jpg',
      },
    });
    // await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });
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

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }
}
