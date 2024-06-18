import { Controller } from '@nestjs/common';
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
}
