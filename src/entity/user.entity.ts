import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   // 데이터 베이스에서 인지하는 컬럼 타입
  //   // 자동으로 유추 됨
  //   // 프로퍼티의 상황에 따라 오류 발생 되기도 함
  //   type: 'varchar',
  //   // 데이터 베이스 칼럼 이름
  //   // 프로퍼티 이름으로 자동 유추됨
  //   name: 'title',
  //   // 값의 길이, 입력할 수 있는 글자의 길이 지정
  //   length: 300,
  //   nullable: true,
  //   // true 이면 처음 저장할 때만 값 지정 가능
  //   // 이후에는 갑 변경 불가능
  //   update: true,
  //   // 기본 값이 true 즉 title을 가져와라
  //   // controller 에서 개별 조정 가능
  //   select: true,
  //   // 아무 값도 입력 안 했을 때 기본 값이 필요한 경우
  //   default: 'default valeu',
  //   // 컬럼 중에서 유일한 값이 돼야하는 가 여부, 기본 값 false, email 등에 사용
  //   // null도 중복되면 안됨.
  //   unique: false,
  // })
  // title: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  // @JoinColumn()
  profile: ProfileModel;
}
